// controllers/descuentos.controller.js

const Descuentos = require('../models/descuentos.model');

// Obtener todos los descuentos
exports.getAllDescuentos = async (req, res) => {
    try {
        const descuentos = await Descuentos.findAll();
        res.json(descuentos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los descuentos' });
    }
};

// Obtener un descuento por ID
exports.getDescuentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const descuento = await Descuentos.findByPk(id);
        if (descuento) {
            res.json(descuento);
        } else {
            res.status(404).json({ error: 'Descuento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el descuento' });
    }
};

// Crear un nuevo descuento
exports.createDescuento = async (req, res) => {
    const { codigo, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;
    try {
        const nuevoDescuento = await Descuentos.create({
            codigo,
            descripcion,
            descuento,
            fecha_inicio,
            fecha_fin
        });
        res.status(201).json(nuevoDescuento);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el descuento' });
    }
};

// Actualizar un descuento por ID
exports.updateDescuento = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;
    try {
        const descuentoExistente = await Descuentos.findByPk(id);
        if (descuentoExistente) {
            descuentoExistente.codigo = codigo;
            descuentoExistente.descripcion = descripcion;
            descuentoExistente.descuento = descuento;
            descuentoExistente.fecha_inicio = fecha_inicio;
            descuentoExistente.fecha_fin = fecha_fin;
            await descuentoExistente.save();
            res.json(descuentoExistente);
        } else {
            res.status(404).json({ error: 'Descuento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el descuento' });
    }
};

// Eliminar un descuento por ID
exports.deleteDescuento = async (req, res) => {
    const { id } = req.params;
    try {
        const descuentoExistente = await Descuentos.findByPk(id);
        if (descuentoExistente) {
            await descuentoExistente.destroy();
            res.json({ message: 'Descuento eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Descuento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el descuento' });
    }
};
