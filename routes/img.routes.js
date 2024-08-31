const express = require('express');
const router = express.Router();
const imagenesPastelesController = require('../controllers/img.controller');

// Ruta para crear una nueva imagen
router.post('/data', imagenesPastelesController.createImage);

// Ruta para obtener todas las imágenes
router.get('/data', imagenesPastelesController.getAllImages);

// Ruta para obtener una imagen por su ID
router.get('/data/:id', imagenesPastelesController.getImageById);

// Ruta para actualizar una imagen
router.put('/data/:id', imagenesPastelesController.updateImage);

// Ruta para eliminar una imagen
router.delete('/data/:id', imagenesPastelesController.deleteImage);

module.exports = router;
