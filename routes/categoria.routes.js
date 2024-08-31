// routes/categoriasRoutes.js
const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoria.controller');

// Ruta para crear una nueva categoría
router.post('/data', categoriasController.createCategoria);

// Ruta para obtener todas las categorías
router.get('/data', categoriasController.getCategorias);

// Ruta para obtener una categoría por ID
router.get('/data/:id', categoriasController.getCategoriaById);

// Ruta para actualizar una categoría
router.put('/data/:id', categoriasController.updateCategoria);

// Ruta para eliminar una categoría
router.delete('/data/:id', categoriasController.deleteCategoria);

module.exports = router;
