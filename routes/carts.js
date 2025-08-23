const express = require('express');
const { cartManager, productManager } = require('../managers');

const router = express.Router();

// POST / - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ success: true, data: newCart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /:cid - Listar productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(parseInt(cid));
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Carrito no encontrado'
      });
    }
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;
    
    // Validar que el carrito existe
    const cart = await cartManager.getCartById(parseInt(cid));
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Carrito no encontrado'
      });
    }
    
    // Validar que el producto existe
    const product = await productManager.getProductById(parseInt(pid));
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    // Validar que el producto esté activo
    if (!product.status) {
      return res.status(400).json({
        success: false,
        error: 'El producto no está disponible'
      });
    }
    
    // Validar stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: 'Stock insuficiente'
      });
    }
    
    // Agregar producto al carrito
    const updatedCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid), quantity);
    
    res.json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 