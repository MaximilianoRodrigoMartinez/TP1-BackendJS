# 🚀 Instrucciones de Uso - TP 1 Backend

## 📋 Descripción del Proyecto
Este es el **Trabajo Práctico N° 1** del curso de Backend, que implementa una API REST completa para gestionar productos y carritos de compra.

## 🛠️ Tecnologías Utilizadas
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **Sistema de archivos** - Persistencia de datos en archivos JSON
- **Axios** - Cliente HTTP para pruebas

## 📁 Estructura del Proyecto
```
├── app.js                 # Servidor principal
├── package.json           # Dependencias del proyecto
├── routes/                # Definición de rutas
│   ├── products.js       # Endpoints de productos
│   └── carts.js          # Endpoints de carritos
├── managers/              # Lógica de negocio
│   ├── ProductManager.js # Gestión de productos
│   ├── CartManager.js    # Gestión de carritos
│   └── index.js          # Instancias compartidas
├── data/                  # Archivos de persistencia
│   ├── products.json     # Base de datos de productos
│   └── carts.json        # Base de datos de carritos
├── demo.js               # Script de demostración
└── README.md             # Documentación técnica
```

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalación de Dependencias
```bash
npm install
```

### 2. Iniciar el Servidor
```bash
npm start
```
El servidor estará disponible en: **http://localhost:8080**

### 3. Modo Desarrollo (con recarga automática)
```bash
npm run dev
```

## 🧪 Probar la API

### Opción 1: Usar el Script de Demostración
```bash
node demo.js
```

### Opción 2: Usar Postman o Similar
Importar las siguientes colecciones de ejemplo:

#### Endpoints de Productos (`/api/products`)
- **GET** `/api/products` - Listar todos los productos
- **GET** `/api/products/:id` - Obtener producto por ID
- **POST** `/api/products` - Crear nuevo producto
- **PUT** `/api/products/:id` - Actualizar producto
- **DELETE** `/api/products/:id` - Eliminar producto

#### Endpoints de Carritos (`/api/carts`)
- **POST** `/api/carts` - Crear nuevo carrito
- **GET** `/api/carts/:id` - Ver productos del carrito
- **POST** `/api/carts/:id/product/:pid` - Agregar producto al carrito

## 📝 Ejemplos de Uso

### Crear un Producto
```json
POST /api/products
{
  "title": "Laptop Gaming",
  "description": "Laptop de alto rendimiento",
  "code": "LAP001",
  "price": 1299.99,
  "stock": 50,
  "category": "Electrónicos",
  "status": true,
  "thumbnails": ["laptop1.jpg"]
}
```

### Crear un Carrito
```json
POST /api/carts
```

### Agregar Producto al Carrito
```json
POST /api/carts/1/product/1
{
  "quantity": 2
}
```

## ✅ Funcionalidades Implementadas

### Productos
- ✅ Crear productos con validaciones
- ✅ Listar todos los productos
- ✅ Obtener producto por ID
- ✅ Actualizar productos
- ✅ Eliminar productos
- ✅ IDs autogenerados únicos
- ✅ Validación de código único

### Carritos
- ✅ Crear carritos vacíos
- ✅ Agregar productos al carrito
- ✅ Incrementar cantidad de productos existentes
- ✅ Ver contenido del carrito
- ✅ IDs autogenerados únicos

### Validaciones
- ✅ Campos requeridos
- ✅ Tipos de datos correctos
- ✅ Stock disponible
- ✅ Productos activos
- ✅ Códigos únicos

## 🔧 Características Técnicas

- **Persistencia**: Archivos JSON en directorio `data/`
- **Manejo de errores**: Respuestas HTTP apropiadas
- **Validaciones**: Completas en frontend y backend
- **Arquitectura**: Separación clara de responsabilidades
- **Async/Await**: Manejo moderno de operaciones asíncronas

## 📊 Estado del Proyecto
- ✅ **Completado**: Todas las funcionalidades requeridas
- ✅ **Probado**: API funcionando correctamente
- ✅ **Documentado**: README y instrucciones completas
- ✅ **Optimizado**: Instancias singleton para managers

## 🎯 Próximos Pasos Sugeridos
1. Implementar autenticación de usuarios
2. Agregar base de datos real (MongoDB, PostgreSQL)
3. Implementar middleware de logging
4. Agregar tests unitarios
5. Implementar paginación en listados
6. Agregar búsqueda y filtros

## 📞 Soporte
Si tienes alguna pregunta o problema:
1. Revisa la documentación en `README.md`
2. Ejecuta `node demo.js` para verificar funcionamiento
3. Verifica que el servidor esté corriendo en puerto 8080
4. Revisa los logs del servidor para errores

---

**¡El proyecto está listo para entregar! 🎉** 