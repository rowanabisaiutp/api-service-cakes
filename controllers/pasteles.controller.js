// controllers/pastelesController.js
const Pastel = require('../models/pasteles.model');
const Usuario = require('../models/user.model');
const Categoria = require('../models/categoria.model');

// Crear un nuevo pastel
exports.createPastel = async (req, res) => {
    try {
        const { nombre, descripcion, precio, disponibilidad, vendedor_id, categoria_id, fecha_publicacion } = req.body;
        const nuevoPastel = await Pastel.create({ nombre, descripcion, precio, disponibilidad, vendedor_id, categoria_id, fecha_publicacion });
        res.status(201).json(nuevoPastel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los pasteles
exports.getPasteles = async (req, res) => {
    try {
        const pasteles = await Pastel.findAll({
            include: [
                { model: Usuario, as: 'vendedor' },
                { model: Categoria, as: 'categoria' }
            ]
        });
        res.status(200).json(pasteles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pastel por ID
exports.getPastelById = async (req, res) => {
    try {
        const { id } = req.params;
        const pastel = await Pastel.findByPk(id, {
            include: [
                { model: Usuario, as: 'vendedor' },
                { model: Categoria, as: 'categoria' }
            ]
        });
        if (pastel) {
            res.status(200).json(pastel);
        } else {
            res.status(404).json({ message: 'Pastel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un pastel
exports.updatePastel = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, disponibilidad, vendedor_id, categoria_id, fecha_publicacion } = req.body;
        const [updated] = await Pastel.update({ nombre, descripcion, precio, disponibilidad, vendedor_id, categoria_id, fecha_publicacion }, {
            where: { pastel_id: id }
        });
        if (updated) {
            const updatedPastel = await Pastel.findByPk(id, {
                include: [
                    { model: Usuario, as: 'vendedor' },
                    { model: Categoria, as: 'categoria' }
                ]
            });
            res.status(200).json(updatedPastel);
        } else {
            res.status(404).json({ message: 'Pastel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un pastel
exports.deletePastel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Pastel.destroy({
            where: { pastel_id: id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Pastel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
