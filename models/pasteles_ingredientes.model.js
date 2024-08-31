const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pastel = require('./pasteles.model');
const Ingrediente = require('./ingredientes.model');

const PastelesIngredientes = sequelize.define('Pasteles_Ingredientes', {
    pastel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Pastel,
            key: 'pastel_id'
        }
    },
    ingrediente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Ingrediente,
            key: 'ingrediente_id'
        }
    }
}, {
    tableName: 'Pasteles_Ingredientes',
    timestamps: false
});

Pastel.belongsToMany(Ingrediente, { through: PastelesIngredientes, foreignKey: 'pastel_id' });
Ingrediente.belongsToMany(Pastel, { through: PastelesIngredientes, foreignKey: 'ingrediente_id' });

module.exports = PastelesIngredientes;
