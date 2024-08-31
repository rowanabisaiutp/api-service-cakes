const DetallesPedido = require('../models/detalles_pedido.model');

// Crear un nuevo detalle de pedido
exports.createDetallePedido = async (req, res) => {
    try {
        const detallePedido = await DetallesPedido.create(req.body);
        res.status(201).json(detallePedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el detalle del pedido' });
    }
};

// Obtener todos los detalles de pedido
exports.getAllDetallesPedido = async (req, res) => {
    try {
        const detallesPedido = await DetallesPedido.findAll();
        res.status(200).json(detallesPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles de pedidos' });
    }
};

// Obtener un detalle de pedido por ID
exports.getDetallePedidoById = async (req, res) => {
    try {
        const detallePedido = await DetallesPedido.findByPk(req.params.id);
        if (detallePedido) {
            res.status(200).json(detallePedido);
        } else {
            res.status(404).json({ error: 'Detalle del pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el detalle del pedido' });
    }
};

// Actualizar un detalle de pedido
exports.updateDetallePedido = async (req, res) => {
    try {
        const detallePedido = await DetallesPedido.findByPk(req.params.id);
        if (detallePedido) {
            await detallePedido.update(req.body);
            res.status(200).json(detallePedido);
        } else {
            res.status(404).json({ error: 'Detalle del pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el detalle del pedido' });
    }
};

// Eliminar un detalle de pedido
exports.deleteDetallePedido = async (req, res) => {
    try {
        const detallePedido = await DetallesPedido.findByPk(req.params.id);
        if (detallePedido) {
            await detallePedido.destroy();
            res.status(200).json({ message: 'Detalle del pedido eliminado' });
        } else {
            res.status(404).json({ error: 'Detalle del pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el detalle del pedido' });
    }
};
