const express = require('express');
const { productManager } = require('../managers');

const router = express.Router();

// GET / - Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST / - Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    
    // Validar campos requeridos
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return res.status(400).json({
          success: false,
          error: `El campo ${field} es requerido`
        });
      }
    }
    
    // Validar tipos de datos
    if (typeof productData.price !== 'number' || productData.price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'El precio debe ser un número mayor a 0'
      });
    }
    
    if (typeof productData.stock !== 'number' || productData.stock < 0) {
      return res.status(400).json({
        success: false,
        error: 'El stock debe ser un número mayor o igual a 0'
      });
    }
    
    // Establecer valores por defecto
    const newProduct = {
      ...productData,
      status: productData.status !== undefined ? productData.status : true,
      thumbnails: productData.thumbnails || []
    };
    
    const createdProduct = await productManager.addProduct(newProduct);
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const updateData = req.body;
    
    // No permitir actualizar el ID
    delete updateData.id;
    
    const updatedProduct = await productManager.updateProduct(parseInt(pid), updateData);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(parseInt(pid));
    
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Producto eliminado correctamente',
      data: deletedProduct 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 