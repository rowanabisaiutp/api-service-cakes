// models/carritos.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./user.model'); // Asegúrate de que el modelo de Usuario esté definido

const Carrito = sequelize.define('Carrito', {
    carrito_id: {
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
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Carritos',
    timestamps: false
});

module.exports = Carrito;
