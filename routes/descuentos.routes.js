// routes/descuentos.routes.js

const express = require('express');
const router = express.Router();
const descuentosController = require('../controllers/descuentos.controller');

// Rutas para CRUD de Descuentos
router.get('/data', descuentosController.getAllDescuentos);
router.get('/data/:id', descuentosController.getDescuentoById);
router.post('/data', descuentosController.createDescuento);
router.put('/data/:id', descuentosController.updateDescuento);
router.delete('/data/:id', descuentosController.deleteDescuento);

module.exports = router;
