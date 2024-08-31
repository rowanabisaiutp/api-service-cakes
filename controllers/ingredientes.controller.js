const Ingrediente = require('../models/ingredientes.model');

// Obtener todos los ingredientes
exports.getIngredientes = async (req, res) => {
    try {
        const ingredientes = await Ingrediente.findAll();
        res.status(200).json(ingredientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un ingrediente por su ID
exports.getIngredienteById = async (req, res) => {
    try {
        const { ingrediente_id } = req.params;
        const ingrediente = await Ingrediente.findByPk(ingrediente_id);
        if (ingrediente) {
            res.status(200).json(ingrediente);
        } else {
            res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo ingrediente
exports.createIngrediente = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoIngrediente = await Ingrediente.create({ nombre, descripcion });
        res.status(201).json(nuevoIngrediente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un ingrediente existente
exports.updateIngrediente = async (req, res) => {
    try {
        const { ingrediente_id } = req.params;
        const { nombre, descripcion } = req.body;

        const ingrediente = await Ingrediente.findByPk(ingrediente_id);
        if (ingrediente) {
            ingrediente.nombre = nombre;
            ingrediente.descripcion = descripcion;
            await ingrediente.save();
            res.status(200).json(ingrediente);
        } else {
            res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un ingrediente
exports.deleteIngrediente = async (req, res) => {
    try {
        const { ingrediente_id } = req.params;
        const ingrediente = await Ingrediente.findByPk(ingrediente_id);
        if (ingrediente) {
            await ingrediente.destroy();
            res.status(204).json({ message: 'Ingrediente eliminado' });
        } else {
            res.status(404).json({ message: 'Ingrediente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
