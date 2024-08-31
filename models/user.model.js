const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const Role = require('./roles.model'); // Asegúrate de que esta importación sea correcta

const User = sequelize.define('Usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Role,
      key: 'rol_id',
    },
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  foto_perfil: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.contrasena) {
        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(user.contrasena, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.contrasena) {
        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(user.contrasena, salt);
      }
    },
  },
});

// Define la asociación con alias
User.belongsTo(Role, { foreignKey: 'rol_id', as: 'Role' });
Role.hasMany(User, { foreignKey: 'rol_id' });

module.exports = User;
