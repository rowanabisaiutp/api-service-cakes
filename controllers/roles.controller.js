const Role = require('../models/roles.model');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const role = await Role.create({ nombre, descripcion });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const [updated] = await Role.update({ nombre, descripcion }, { where: { rol_id: id } });
    if (updated) {
      const updatedRole = await Role.findByPk(id);
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un rol por ID
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Role.destroy({ where: { rol_id: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
