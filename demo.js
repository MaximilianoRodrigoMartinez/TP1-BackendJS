const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api';

async function demoAPI() {
  try {
    console.log('🚀 Demostración de la API de Productos y Carritos\n');

    // 1. Crear productos de ejemplo
    console.log('📦 Creando productos de ejemplo...');
    const timestamp = Date.now();
    
    const laptop = await axios.post(`${BASE_URL}/products`, {
      title: 'Laptop Dell Inspiron',
      description: 'Laptop de 15 pulgadas con procesador Intel i5',
      code: `LAP${timestamp}`,
      price: 899.99,
      stock: 25,
      category: 'Computadoras',
      status: true,
      thumbnails: ['laptop1.jpg', 'laptop2.jpg']
    });
    console.log('✅ Laptop creada con ID:', laptop.data.data.id);

    const mouse = await axios.post(`${BASE_URL}/products`, {
      title: 'Mouse Logitech MX Master',
      description: 'Mouse inalámbrico ergonómico',
      code: `MOU${timestamp}`,
      price: 79.99,
      stock: 50,
      category: 'Accesorios',
      status: true,
      thumbnails: ['mouse1.jpg']
    });
    console.log('✅ Mouse creado con ID:', mouse.data.data.id);

    const keyboard = await axios.post(`${BASE_URL}/products`, {
      title: 'Teclado Mecánico Corsair',
      description: 'Teclado gaming con switches Cherry MX',
      code: `TEC${timestamp}`,
      price: 149.99,
      stock: 30,
      category: 'Accesorios',
      status: true,
      thumbnails: ['keyboard1.jpg', 'keyboard2.jpg']
    });
    console.log('✅ Teclado creado con ID:', keyboard.data.data.id);

    // 2. Listar todos los productos
    console.log('\n📋 Listando todos los productos...');
    const allProducts = await axios.get(`${BASE_URL}/products`);
    console.log(`✅ Total de productos en el sistema: ${allProducts.data.data.length}`);

    // 3. Crear carrito de compra
    console.log('\n🛒 Creando carrito de compra...');
    const cart = await axios.post(`${BASE_URL}/carts`);
    console.log('✅ Carrito creado con ID:', cart.data.data.id);

    // 4. Agregar productos al carrito
    console.log('\n➕ Agregando productos al carrito...');
    await axios.post(`${BASE_URL}/carts/${cart.data.data.id}/product/${laptop.data.data.id}`, {
      quantity: 1
    });
    await axios.post(`${BASE_URL}/carts/${cart.data.data.id}/product/${mouse.data.data.id}`, {
      quantity: 2
    });
    await axios.post(`${BASE_URL}/carts/${cart.data.data.id}/product/${keyboard.data.data.id}`, {
      quantity: 1
    });
    console.log('✅ Productos agregados al carrito');

    // 5. Ver contenido del carrito
    console.log('\n🛍️ Contenido del carrito:');
    const cartContent = await axios.get(`${BASE_URL}/carts/${cart.data.data.id}`);
    console.log('📦 Productos en el carrito:', cartContent.data.data.products.length, 'tipos diferentes');
    
    // Mostrar detalles del carrito
    for (const item of cartContent.data.data.products) {
      const product = allProducts.data.data.find(p => p.id === item.product);
      if (product) {
        console.log(`   - ${product.title}: ${item.quantity} unidad(es) - $${product.price} c/u`);
      }
    }

    // 6. Actualizar precio de un producto
    console.log('\n💰 Actualizando precio del laptop...');
    const updatedLaptop = await axios.put(`${BASE_URL}/products/${laptop.data.data.id}`, {
      price: 849.99
    });
    console.log('✅ Nuevo precio del laptop: $', updatedLaptop.data.data.price);

    // 7. Agregar más cantidad de un producto existente
    console.log('\n➕ Agregando más cantidad del mouse...');
    await axios.post(`${BASE_URL}/carts/${cart.data.data.id}/product/${mouse.data.data.id}`, {
      quantity: 1
    });
    
    const updatedCart = await axios.get(`${BASE_URL}/carts/${cart.data.data.id}`);
    const mouseInCart = updatedCart.data.data.products.find(p => p.product === mouse.data.data.id);
    console.log('✅ Nueva cantidad del mouse en el carrito:', mouseInCart.quantity);

    console.log('\n🎉 ¡Demostración completada exitosamente!');
    console.log('\n📊 Resumen:');
    console.log('- ✅ 3 productos creados');
    console.log('- ✅ Carrito creado');
    console.log('- ✅ Productos agregados al carrito');
    console.log('- ✅ Producto actualizado');
    console.log('- ✅ Cantidad incrementada');
    console.log('\n🌐 La API está funcionando correctamente en http://localhost:8080');

  } catch (error) {
    console.error('❌ Error durante la demostración:', error.response?.data || error.message);
  }
}

// Ejecutar demostración
demoAPI(); 