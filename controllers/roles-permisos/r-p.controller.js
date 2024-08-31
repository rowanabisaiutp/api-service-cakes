// controllers/roles_permissions.controller.js
const RolePermission = require('../../models/roles-permisos/r-p.model');

// Obtener todas las asociaciones de roles y permisos
exports.getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.findAll();
    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una asociación por rol_id y permiso_id
exports.getRolePermissionById = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findOne({
      where: {
        rol_id: req.params.rol_id,
        permiso_id: req.params.permiso_id,
      },
    });
    if (!rolePermission) {
      return res.status(404).json({ message: 'RolePermission not found' });
    }
    res.json(rolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva asociación
exports.createRolePermission = async (req, res) => {
  try {
    const newRolePermission = await RolePermission.create(req.body);
    res.status(201).json(newRolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una asociación por rol_id y permiso_id
exports.updateRolePermission = async (req, res) => {
  try {
    const { rol_id, permiso_id } = req.params;
    const updated = await RolePermission.update(req.body, {
      where: {
        rol_id: rol_id,
        permiso_id: permiso_id,
      },
    });

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'RolePermission not found' });
    }

    res.json({ message: 'RolePermission updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar una asociación por rol_id y permiso_id
exports.deleteRolePermission = async (req, res) => {
  try {
    const deleted = await RolePermission.destroy({
      where: {
        rol_id: req.params.rol_id,
        permiso_id: req.params.permiso_id,
      },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'RolePermission not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
