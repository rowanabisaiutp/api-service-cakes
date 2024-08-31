// routes/carritos_pasteles.routes.js

const express = require('express');
const router = express.Router();
const carritosPastelesController = require('../controllers/carritos_pasteles.controller');

// Rutas para CRUD de Carritos_Pasteles
router.get('/data', carritosPastelesController.getAllCarritosPasteles);
router.get('/data/:carrito_id/:pastel_id', carritosPastelesController.getCarritosPastelesById);
router.post('/data', carritosPastelesController.createCarritosPasteles);
router.put('/data/:carrito_id/:pastel_id', carritosPastelesController.updateCarritosPasteles);
router.delete('/data/:carrito_id/:pastel_id', carritosPastelesController.deleteCarritosPasteles);

module.exports = router;
