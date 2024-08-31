// routes/favoritos.routes.js

const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritos.controller');

// Rutas para CRUD de Favoritos
router.get('/data', favoritosController.getAllFavoritos);
router.get('/data/:id', favoritosController.getFavoritoById);
router.post('/data', favoritosController.createFavorito);
router.put('/data/:id', favoritosController.updateFavorito);
router.delete('/data/:id', favoritosController.deleteFavorito);

module.exports = router;
