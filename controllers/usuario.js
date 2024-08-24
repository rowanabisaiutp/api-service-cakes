// controllers/usuario.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { Op } = require('sequelize');

// Obtener todos los usuarios
exports.getAllUsuario = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, contrasena, telefono, direccion, rol_id, activo } = req.body;
    const foto_perfil = req.file ? req.file.path : null;

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      contrasena: hashedPassword,
      telefono,
      direccion,
      rol_id,
      fecha_registro: new Date(),
      activo,
      foto_perfil
    });

    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar usuarios por filtros
exports.searchUsuarios = async (req, res) => {
  try {
    const { nombre, email, telefono, rol_id, activo } = req.query;
    const whereClause = {};

    if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
    if (email) whereClause.email = { [Op.like]: `%${email}%` };
    if (telefono) whereClause.telefono = { [Op.like]: `%${telefono}%` };
    if (rol_id) whereClause.rol_id = rol_id;
    if (activo !== undefined) whereClause.activo = activo === 'true';



    const usuarios = await Usuario.findAll({
      where: whereClause,
      include: [
        {
          model: Rol,
          attributes: [
            'descripcion',
            
          ]
        }
      ]
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, email, contrasena, telefono, direccion, rol_id, activo } = req.body;
    const foto_perfil = req.file ? req.file.path : null;

    const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : undefined;

    const [updated] = await Usuario.update({
      nombre,
      email,
      contrasena: hashedPassword,
      telefono,
      direccion,
      rol_id,
      activo,
      foto_perfil
    }, {
      where: { usuario_id: req.params.id }
    });

    if (updated) {
      const updatedUsuario = await Usuario.findByPk(req.params.id);
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { usuario_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
