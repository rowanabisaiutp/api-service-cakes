const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo apunte a tu configuración de base de datos

const Ingrediente = sequelize.define('Ingrediente', {
    ingrediente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Ingredientes',
    timestamps: false
});

module.exports = Ingrediente;
