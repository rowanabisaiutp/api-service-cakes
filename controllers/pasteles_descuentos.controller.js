// controllers/pasteles_descuentos.controller.js
const PastelesDescuentos = require('../models/pasteles_descuentos.model');
const Pastel = require('../models/pasteles.model');
const Descuento = require('../models/descuentos.model');

// Crear una nueva asociación
exports.create = async (req, res) => {
    try {
        const { pastel_id, descuento_id } = req.body;

        // Verificar que el pastel y el descuento existen
        const pastel = await Pastel.findByPk(pastel_id);
        const descuento = await Descuento.findByPk(descuento_id);

        if (!pastel || !descuento) {
            return res.status(404).json({ error: 'Pastel o descuento no encontrado' });
        }

        const nuevaAsociacion = await PastelesDescuentos.create({ pastel_id, descuento_id });
        res.status(201).json(nuevaAsociacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las asociaciones
exports.getAll = async (req, res) => {
    try {
        const asociaciones = await PastelesDescuentos.findAll();
        res.status(200).json(asociaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una asociación por ID
exports.getById = async (req, res) => {
    try {
        const { pastel_id, descuento_id } = req.params;
        const asociacion = await PastelesDescuentos.findOne({ where: { pastel_id, descuento_id } });

        if (!asociacion) {
            return res.status(404).json({ error: 'Asociación no encontrada' });
        }

        res.status(200).json(asociacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una asociación
exports.update = async (req, res) => {
    try {
        const { pastel_id, descuento_id } = req.params;
        const { nuevo_descuento_id } = req.body;

        const asociacion = await PastelesDescuentos.findOne({ where: { pastel_id, descuento_id } });

        if (!asociacion) {
            return res.status(404).json({ error: 'Asociación no encontrada' });
        }

        asociacion.descuento_id = nuevo_descuento_id;
        await asociacion.save();

        res.status(200).json(asociacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una asociación
exports.delete = async (req, res) => {
    try {
        const { pastel_id, descuento_id } = req.params;
        const asociacion = await PastelesDescuentos.findOne({ where: { pastel_id, descuento_id } });

        if (!asociacion) {
            return res.status(404).json({ error: 'Asociación no encontrada' });
        }

        await asociacion.destroy();
        res.status(200).json({ message: 'Asociación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
