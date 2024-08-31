const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentarios.controller');

// Crear un nuevo comentario
router.post('/data', comentariosController.createComentario);

// Obtener todos los comentarios
router.get('/data', comentariosController.getAllComentarios);

// Obtener un comentario por ID
router.get('/data/:id', comentariosController.getComentarioById);

// Actualizar un comentario
router.put('/data/:id', comentariosController.updateComentario);

// Eliminar un comentario
router.delete('/data/:id', comentariosController.deleteComentario);

module.exports = router;
