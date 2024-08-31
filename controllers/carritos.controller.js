// controllers/carritos.controller.js

const Carrito = require('../models/carritos.model');

// Obtener todos los carritos
exports.getAllCarritos = async (req, res) => {
    try {
        const carritos = await Carrito.findAll();
        res.json(carritos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los carritos' });
    }
};

// Obtener un carrito por ID
exports.getCarritoById = async (req, res) => {
    const { id } = req.params;
    try {
        const carrito = await Carrito.findByPk(id);
        if (carrito) {
            res.json(carrito);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
};

// Crear un nuevo carrito
exports.createCarrito = async (req, res) => {
    const { usuario_id } = req.body;
    try {
        const nuevoCarrito = await Carrito.create({
            usuario_id,
            fecha_creacion: new Date()
        });
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
};

// Actualizar un carrito por ID
exports.updateCarrito = async (req, res) => {
    const { id } = req.params;
    const { usuario_id } = req.body;
    try {
        const carrito = await Carrito.findByPk(id);
        if (carrito) {
            carrito.usuario_id = usuario_id;
            await carrito.save();
            res.json(carrito);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
};

// Eliminar un carrito por ID
exports.deleteCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const carrito = await Carrito.findByPk(id);
        if (carrito) {
            await carrito.destroy();
            res.json({ message: 'Carrito eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito' });
    }
};
