const PastelesIngredientes = require('../models/pasteles_ingredientes.model');
const Pastel = require('../models/pasteles.model');
const Ingrediente = require('../models/ingredientes.model');

// Crear una nueva relación pastel-ingrediente
exports.createRelacion = async (req, res) => {
    try {
        const { pastel_id, ingrediente_id } = req.body;
        const nuevaRelacion = await PastelesIngredientes.create({ pastel_id, ingrediente_id });
        res.status(201).json(nuevaRelacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las relaciones pastel-ingrediente
exports.getRelaciones = async (req, res) => {
    try {
        const pastelesIngredientes = await PastelesIngredientes.findAll({
            attributes: ['pastel_id', 'ingrediente_id'] // Solo selecciona estos dos campos
        });
        res.json(pastelesIngredientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una relación pastel-ingrediente
exports.deleteRelacion = async (req, res) => {
    try {
        const { pastel_id, ingrediente_id } = req.params;
        await PastelesIngredientes.destroy({ where: { pastel_id, ingrediente_id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
