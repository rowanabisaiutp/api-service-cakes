// routes/carritos.routes.js

const express = require('express');
const router = express.Router();
const carritosController = require('../controllers/carritos.controller');

// Rutas para CRUD de Carritos
router.get('/data', carritosController.getAllCarritos);
router.get('/data/:id', carritosController.getCarritoById);
router.post('/data', carritosController.createCarrito);
router.put('/data/:id', carritosController.updateCarrito);
router.delete('/data/:id', carritosController.deleteCarrito);

module.exports = router;
