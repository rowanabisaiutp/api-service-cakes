// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa tus modelos aquí
db.Usuario = require('./usuario')(sequelize, DataTypes);
db.Rol = require('./rol')(sequelize, DataTypes);

// Define las asociaciones aquí
db.Usuario.associate(db);
db.Rol.associate(db);

module.exports = db;
