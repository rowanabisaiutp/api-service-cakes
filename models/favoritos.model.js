// models/favoritos.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./user.model'); // Asegúrate de que el modelo de Usuario esté definido
const Pastel = require('./pasteles.model'); // Asegúrate de que el modelo de Pastel esté definido

const Favorito = sequelize.define('Favorito', {
    favorito_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'usuario_id'
        }
    },
    pastel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pastel,
            key: 'pastel_id'
        }
    },
    fecha_agregado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Favoritos',
    timestamps: false
});

module.exports = Favorito;
