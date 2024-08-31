// controllers/favoritos.controller.js

const Favorito = require('../models/favoritos.model');

// Obtener todos los favoritos
exports.getAllFavoritos = async (req, res) => {
    try {
        const favoritos = await Favorito.findAll();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
};

// Obtener un favorito por ID
exports.getFavoritoById = async (req, res) => {
    const { id } = req.params;
    try {
        const favorito = await Favorito.findByPk(id);
        if (favorito) {
            res.json(favorito);
        } else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el favorito' });
    }
};

// Crear un nuevo favorito
exports.createFavorito = async (req, res) => {
    const { usuario_id, pastel_id } = req.body;
    try {
        const nuevoFavorito = await Favorito.create({
            usuario_id,
            pastel_id,
            fecha_agregado: new Date()
        });
        res.status(201).json(nuevoFavorito);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el favorito' });
    }
};

// Actualizar un favorito por ID
exports.updateFavorito = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, pastel_id } = req.body;
    try {
        const favorito = await Favorito.findByPk(id);
        if (favorito) {
            favorito.usuario_id = usuario_id;
            favorito.pastel_id = pastel_id;
            favorito.fecha_agregado = new Date();
            await favorito.save();
            res.json(favorito);
        } else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el favorito' });
    }
};

// Eliminar un favorito por ID
exports.deleteFavorito = async (req, res) => {
    const { id } = req.params;
    try {
        const favorito = await Favorito.findByPk(id);
        if (favorito) {
            await favorito.destroy();
            res.json({ message: 'Favorito eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el favorito' });
    }
};
