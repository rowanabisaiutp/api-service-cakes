// models/pasteles_descuentos.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pastel = require('./pasteles.model');
const Descuento = require('./descuentos.model');

const PastelesDescuentos = sequelize.define('Pasteles_Descuentos', {
    pastel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Pastel,
            key: 'pastel_id'
        }
    },
    descuento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Descuento,
            key: 'descuento_id'
        }
    }
}, {
    tableName: 'Pasteles_Descuentos',
    timestamps: false
});

// Definición de asociaciones
Pastel.belongsToMany(Descuento, { through: PastelesDescuentos, foreignKey: 'pastel_id' });
Descuento.belongsToMany(Pastel, { through: PastelesDescuentos, foreignKey: 'descuento_id' });

module.exports = PastelesDescuentos;
