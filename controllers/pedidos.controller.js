const Pedido = require('../models/pedidos.model');

// Crear un nuevo pedido
const createPedido = async (req, res) => {
    try {
        const { comprador_id, total, fecha_pedido, estado, direccion_envio, metodo_envio, fecha_entrega } = req.body;
        const nuevoPedido = await Pedido.create({ comprador_id, total, fecha_pedido, estado, direccion_envio, metodo_envio, fecha_entrega });
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un pedido por ID
const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un pedido por ID
const updatePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { comprador_id, total, fecha_pedido, estado, direccion_envio, metodo_envio, fecha_entrega } = req.body;
        const [updated] = await Pedido.update({ comprador_id, total, fecha_pedido, estado, direccion_envio, metodo_envio, fecha_entrega }, {
            where: { pedido_id: id }
        });
        if (updated) {
            const updatedPedido = await Pedido.findByPk(id);
            res.json(updatedPedido);
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un pedido por ID
const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Pedido.destroy({
            where: { pedido_id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPedido,
    getAllPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
};
