const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagos.controller');

// Crear un nuevo pago
router.post('/data', pagosController.createPago);

// Obtener todos los pagos
router.get('/data', pagosController.getAllPagos);

// Obtener un pago por ID
router.get('/data/:id', pagosController.getPagoById);

// Actualizar un pago
router.put('/data/:id', pagosController.updatePago);

// Eliminar un pago
router.delete('/data/:id', pagosController.deletePago);

module.exports = router;
