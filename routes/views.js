const express = require('express');
const { productManager } = require('../managers');

const router = express.Router();

// GET / - Vista home con todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', {
      title: 'Inicio',
      products: products
    });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.render('home', {
      title: 'Inicio',
      products: []
    });
  }
});

// GET /realtimeproducts - Vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {
      title: 'Productos en Tiempo Real',
      products: products
    });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.render('realTimeProducts', {
      title: 'Productos en Tiempo Real',
      products: []
    });
  }
});

module.exports = router;
