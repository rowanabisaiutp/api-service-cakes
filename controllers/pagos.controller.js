const Pago = require('../models/pagos.model');

// Crear un nuevo pago
exports.createPago = async (req, res) => {
    try {
        const pago = await Pago.create(req.body);
        res.status(201).json(pago);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pago' });
    }
};

// Obtener todos los pagos
exports.getAllPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
};

// Obtener un pago por ID
exports.getPagoById = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (pago) {
            res.status(200).json(pago);
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pago' });
    }
};

// Actualizar un pago
exports.updatePago = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (pago) {
            await pago.update(req.body);
            res.status(200).json(pago);
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago
exports.deletePago = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (pago) {
            await pago.destroy();
            res.status(200).json({ message: 'Pago eliminado' });
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};
