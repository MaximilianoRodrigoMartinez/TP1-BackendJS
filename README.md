TP 2 - Backend con Node.js y Express

API REST para gestión de productos y carritos de compra desarrollada con Node.js y Express.  
Incluye funcionalidades en **tiempo real** usando WebSockets y vistas dinámicas con Handlebars.

## Características
- Gestión completa de productos (CRUD)
- Gestión de carritos de compra
- Persistencia de datos en archivos JSON
- Validaciones de datos
- Manejo de errores robusto

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

## Uso

### Iniciar el servidor
```bash
npm start
```

### Modo desarrollo (con nodemon)
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:8080`

## Endpoints de la API

### Productos (`/api/products`)

#### GET `/api/products`
Lista todos los productos

#### GET `/api/products/:pid`
Obtiene un producto específico por ID

#### POST `/api/products`
Crea un nuevo producto

**Body requerido:**
```json
{
  "title": "Nombre del producto",
  "description": "Descripción del producto",
  "code": "CODIGO_UNICO",
  "price": 99.99,
  "stock": 100,
  "category": "Categoría",
  "status": true,
  "thumbnails": ["url1.jpg", "url2.jpg"]
}
```

#### PUT `/api/products/:pid`
Actualiza un producto existente

#### DELETE `/api/products/:pid`
Elimina un producto

### Carritos (`/api/carts`)

#### POST `/api/carts`
Crea un nuevo carrito

#### GET `/api/carts/:cid`
Obtiene los productos de un carrito específico

#### POST `/api/carts/:cid/product/:pid`
Agrega un producto al carrito

**Body opcional:**
```json
{
  "quantity": 2
}
```

## Estructura del Proyecto

```
├── app.js                 # Archivo principal del servidor
├── package.json           # Dependencias del proyecto
├── routes/                # Rutas de la API
│   ├── products.js       # Rutas de productos
│   └── carts.js          # Rutas de carritos
├── managers/              # Lógica de negocio
│   ├── ProductManager.js # Gestión de productos
│   └── CartManager.js    # Gestión de carritos
└── data/                  # Archivos de persistencia
    ├── products.json     # Base de datos de productos
    └── carts.json        # Base de datos de carritos
```

## Validaciones

- Los IDs se autogeneran y nunca se repiten
- El código de producto debe ser único
- El precio debe ser un número mayor a 0
- El stock debe ser un número mayor o igual a 0
- Se valida la existencia de productos y carritos antes de operaciones

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sistema de archivos para persistencia
- Async/Await para operaciones asíncronas

## Autor
Desarrollado para el curso de Backend 



