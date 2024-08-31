const express = require('express');
const router = express.Router();
const { createPedido, getAllPedidos, getPedidoById, updatePedido, deletePedido } = require('../controllers/pedidos.controller');

// Crear un nuevo pedido
router.post('/data', createPedido);

// Obtener todos los pedidos
router.get('/data', getAllPedidos);

// Obtener un pedido por ID
router.get('/data/:id', getPedidoById);

// Actualizar un pedido por ID
router.put('/data/:id', updatePedido);

// Eliminar un pedido por ID
router.delete('/data/:id', deletePedido);

module.exports = router;
