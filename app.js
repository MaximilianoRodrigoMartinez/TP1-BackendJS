const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

// Importar rutas
const viewsRouter = require('./routes/views');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Importar managers
const { productManager } = require('./managers');

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 8080;

// Configurar Handlebars SIN layout para evitar problemas de BOM
app.engine('handlebars', exphbs.engine({
  defaultLayout: false
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta especial para realtimeproducts SIN Handlebars
app.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Productos en Tiempo Real</title>
</head>
<body>
    <h1>Productos en Tiempo Real</h1>
    
    <form id="productForm">
        <input type="text" id="title" placeholder="Título" required>
        <input type="text" id="code" placeholder="Código" required>
        <input type="number" id="price" placeholder="Precio" required>
        <input type="number" id="stock" placeholder="Stock" required>
        <input type="text" id="category" placeholder="Categoría" required>
        <button type="submit">Agregar Producto</button>
    </form>
    
    <div id="productsList">
        ${products.map(product => `
            <div>
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        `).join('')}
    </div>
    
    <script src="/socket.io/socket.io.js"></script>
    <script>
    const socket = io();
    
    document.getElementById("productForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const productData = {
            title: document.getElementById("title").value,
            code: document.getElementById("code").value,
            price: parseFloat(document.getElementById("price").value),
            stock: parseInt(document.getElementById("stock").value),
            category: document.getElementById("category").value,
            description: "Descripción básica",
            status: true
        };
        socket.emit("createProduct", productData);
        e.target.reset();
    });
    
    function deleteProduct(id) {
        socket.emit("deleteProduct", id);
    }
    
    socket.on("productsUpdated", (products) => {
        const container = document.getElementById("productsList");
        container.innerHTML = products.map(product => \`
            <div>
                <h3>\${product.title}</h3>
                <p>\${product.description}</p>
                <p>Precio: $\${product.price}</p>
                <p>Stock: \${product.stock}</p>
                <button onclick="deleteProduct(\${product.id})">Eliminar</button>
            </div>
        \`).join("");
    });
    </script>
</body>
</html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Configurar Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Manejar creación de productos
  socket.on('createProduct', async (productData) => {
    try {
      const newProduct = await productManager.addProduct(productData);
      
      // Obtener todos los productos actualizados
      const allProducts = await productManager.getProducts();
      
      // Emitir actualización a todos los clientes conectados
      io.emit('productsUpdated', allProducts);
      
      console.log('Producto creado:', newProduct.title);
    } catch (error) {
      console.error('Error creando producto:', error);
      socket.emit('error', { message: error.message });
    }
  });

  // Manejar eliminación de productos
  socket.on('deleteProduct', async (productId) => {
    try {
      const deletedProduct = await productManager.deleteProduct(productId);
      
      // Obtener todos los productos actualizados
      const allProducts = await productManager.getProducts();
      
      // Emitir actualización a todos los clientes conectados
      io.emit('productsUpdated', allProducts);
      
      console.log('Producto eliminado:', deletedProduct.title);
    } catch (error) {
      console.error('Error eliminando producto:', error);
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
  console.log('API disponible en: http://localhost:' + PORT + '/api');
  console.log('Vistas disponibles en: http://localhost:' + PORT);
});
