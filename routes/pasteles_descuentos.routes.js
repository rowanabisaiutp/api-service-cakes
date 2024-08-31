// routes/pasteles_descuentos.routes.js
const express = require('express');
const router = express.Router();
const pastelesDescuentosController = require('../controllers/pasteles_descuentos.controller');

// Crear una nueva asociación
router.post('/data', pastelesDescuentosController.create);

// Obtener todas las asociaciones
router.get('/data', pastelesDescuentosController.getAll);

// Obtener una asociación por ID
router.get('/data/:pastel_id/:descuento_id', pastelesDescuentosController.getById);

// Actualizar una asociación
router.put('/data/:pastel_id/:descuento_id', pastelesDescuentosController.update);

// Eliminar una asociación
router.delete('/data/:pastel_id/:descuento_id', pastelesDescuentosController.delete);

module.exports = router;
