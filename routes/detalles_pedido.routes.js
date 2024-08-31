const express = require('express');
const router = express.Router();
const detallesPedidoController = require('../controllers/detalles_pedido.controller');

// Crear un nuevo detalle de pedido
router.post('/data', detallesPedidoController.createDetallePedido);

// Obtener todos los detalles de pedido
router.get('/data', detallesPedidoController.getAllDetallesPedido);

// Obtener un detalle de pedido por ID
router.get('/data/:id', detallesPedidoController.getDetallePedidoById);

// Actualizar un detalle de pedido
router.put('/data/:id', detallesPedidoController.updateDetallePedido);

// Eliminar un detalle de pedido
router.delete('/data/:id', detallesPedidoController.deleteDetallePedido);

module.exports = router;
