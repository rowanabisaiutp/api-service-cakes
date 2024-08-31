// models/pasteles.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener la configuración de tu base de datos en este archivo
const Usuario = require('./user.model'); // Importa el modelo de Usuarios
const Categoria = require('./categoria.model'); // Importa el modelo de Categorias

const Pastel = sequelize.define('Pastel', {
    pastel_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    disponibilidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Pasteles',
    timestamps: false // Si usas timestamps, ajusta esto según tu configuración
});

// Definición de asociaciones
Pastel.belongsTo(Usuario, { foreignKey: 'vendedor_id', as: 'vendedor' });
Pastel.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

module.exports = Pastel;
