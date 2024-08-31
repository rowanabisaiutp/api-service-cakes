const express = require('express');
const router = express.Router();
const pastelesIngredientesController = require('../controllers/pasteles_ingredientes.controller');

// Crear una nueva relación pastel-ingrediente
router.post('/data', pastelesIngredientesController.createRelacion);

// Obtener todas las relaciones pastel-ingrediente
router.get('/data', pastelesIngredientesController.getRelaciones);

// Eliminar una relación pastel-ingrediente
router.delete('/data/:pastel_id/:ingrediente_id', pastelesIngredientesController.deleteRelacion);

module.exports = router;
