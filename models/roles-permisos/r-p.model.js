// models/roles_permissions.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const RolePermission = sequelize.define('RolePermission', {
  rol_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Roles',
      key: 'rol_id',
    },
  },
  permiso_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Permisos',
      key: 'permiso_id',
    },
  },
}, {
  timestamps: false,
  tableName: 'Roles_Permisos', // Nombre de la tabla en la base de datos
});

module.exports = RolePermission;
