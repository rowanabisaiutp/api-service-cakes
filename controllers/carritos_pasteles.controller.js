// controllers/carritos_pasteles.controller.js

const CarritosPasteles = require('../models/carritos_pasteles.model');

// Obtener todos los carritos-pasteles
exports.getAllCarritosPasteles = async (req, res) => {
    try {
        const carritosPasteles = await CarritosPasteles.findAll();
        res.json(carritosPasteles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los carritos-pasteles' });
    }
};

// Obtener un carrito-pastel por carrito_id y pastel_id
exports.getCarritosPastelesById = async (req, res) => {
    const { carrito_id, pastel_id } = req.params;
    try {
        const carritosPasteles = await CarritosPasteles.findOne({
            where: { carrito_id, pastel_id }
        });
        if (carritosPasteles) {
            res.json(carritosPasteles);
        } else {
            res.status(404).json({ error: 'Carrito-Pastel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito-pastel' });
    }
};

// Crear un nuevo carrito-pastel
exports.createCarritosPasteles = async (req, res) => {
    const { carrito_id, pastel_id, cantidad } = req.body;
    try {
        const nuevoCarritosPasteles = await CarritosPasteles.create({
            carrito_id,
            pastel_id,
            cantidad
        });
        res.status(201).json(nuevoCarritosPasteles);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito-pastel' });
    }
};

// Actualizar un carrito-pastel por carrito_id y pastel_id
exports.updateCarritosPasteles = async (req, res) => {
    const { carrito_id, pastel_id } = req.params;
    const { cantidad } = req.body;
    try {
        const carritosPasteles = await CarritosPasteles.findOne({
            where: { carrito_id, pastel_id }
        });
        if (carritosPasteles) {
            carritosPasteles.cantidad = cantidad;
            await carritosPasteles.save();
            res.json(carritosPasteles);
        } else {
            res.status(404).json({ error: 'Carrito-Pastel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito-pastel' });
    }
};

// Eliminar un carrito-pastel por carrito_id y pastel_id
exports.deleteCarritosPasteles = async (req, res) => {
    const { carrito_id, pastel_id } = req.params;
    try {
        const carritosPasteles = await CarritosPasteles.findOne({
            where: { carrito_id, pastel_id }
        });
        if (carritosPasteles) {
            await carritosPasteles.destroy();
            res.json({ message: 'Carrito-Pastel eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Carrito-Pastel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito-pastel' });
    }
};
