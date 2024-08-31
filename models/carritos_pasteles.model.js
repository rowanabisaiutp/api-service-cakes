// models/carritos_pasteles.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Carrito = require('./carritos.model'); // Asegúrate de que el modelo de Carrito esté definido
const Pastel = require('./pasteles.model'); // Asegúrate de que el modelo de Pastel esté definido

const CarritosPasteles = sequelize.define('CarritosPasteles', {
    carrito_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Carrito,
            key: 'carrito_id'
        }
    },
    pastel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Pastel,
            key: 'pastel_id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Carritos_Pasteles',
    timestamps: false
});

Carrito.belongsToMany(Pastel, { through: CarritosPasteles, foreignKey: 'carrito_id' });
Pastel.belongsToMany(Carrito, { through: CarritosPasteles, foreignKey: 'pastel_id' });

module.exports = CarritosPasteles;
