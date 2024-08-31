// controllers/permissions.controller.js
const Permission = require('../models/permisos.model');

// Obtener todos los permisos
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un permiso por ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo permiso
exports.createPermission = async (req, res) => {
  try {
    const newPermission = await Permission.create(req.body);
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un permiso por ID
exports.updatePermission = async (req, res) => {
  try {
    const [updated] = await Permission.update(req.body, {
      where: { permiso_id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    const updatedPermission = await Permission.findByPk(req.params.id);
    res.json(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un permiso por ID
exports.deletePermission = async (req, res) => {
  try {
    const deleted = await Permission.destroy({
      where: { permiso_id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
