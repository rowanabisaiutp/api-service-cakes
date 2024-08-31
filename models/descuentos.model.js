// models/descuentos.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Descuentos = sequelize.define('Descuentos', {
    descuento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descuento: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Descuentos',
    timestamps: false
});

module.exports = Descuentos;
