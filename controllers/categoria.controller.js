// controllers/categoriasController.js
const Categoria = require('../models/categoria.model');

// Crear una nueva categoría
exports.createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevaCategoria = await Categoria.create({ nombre, descripcion });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una categoría por ID
exports.getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una categoría
exports.updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const [updated] = await Categoria.update({ nombre, descripcion }, {
            where: { categoria_id: id }
        });
        if (updated) {
            const updatedCategoria = await Categoria.findByPk(id);
            res.status(200).json(updatedCategoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una categoría
exports.deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Categoria.destroy({
            where: { categoria_id: id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
