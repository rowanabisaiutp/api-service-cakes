const Comentario = require('../models/comentarios.model');

// Crear un nuevo comentario
exports.createComentario = async (req, res) => {
    try {
        const comentario = await Comentario.create(req.body);
        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
};

// Obtener todos los comentarios
exports.getAllComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll();
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};

// Obtener un comentario por ID
exports.getComentarioById = async (req, res) => {
    try {
        const comentario = await Comentario.findByPk(req.params.id);
        if (comentario) {
            res.status(200).json(comentario);
        } else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el comentario' });
    }
};

// Actualizar un comentario
exports.updateComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findByPk(req.params.id);
        if (comentario) {
            await comentario.update(req.body);
            res.status(200).json(comentario);
        } else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el comentario' });
    }
};

// Eliminar un comentario
exports.deleteComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findByPk(req.params.id);
        if (comentario) {
            await comentario.destroy();
            res.status(200).json({ message: 'Comentario eliminado' });
        } else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
};
