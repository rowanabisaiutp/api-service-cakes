// routes/pastelesRoutes.js
const express = require('express');
const router = express.Router();
const pastelesController = require('../controllers/pasteles.controller');

// Ruta para crear un nuevo pastel
router.post('/data', pastelesController.createPastel);

// Ruta para obtener todos los pasteles
router.get('/data', pastelesController.getPasteles);

// Ruta para obtener un pastel por ID
router.get('/data/:id', pastelesController.getPastelById);

// Ruta para actualizar un pastel
router.put('/data/:id', pastelesController.updatePastel);

// Ruta para eliminar un pastel
router.delete('/data/:id', pastelesController.deletePastel);

module.exports = router;
