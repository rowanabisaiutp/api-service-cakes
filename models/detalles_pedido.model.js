const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./pedidos.model');
const Pastel = require('./pasteles.model');

const DetallesPedido = sequelize.define('DetallesPedido', {
    detalle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'pedido_id'
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
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Detalles_Pedido',
    timestamps: false
});

// Relaciones
Pedido.hasMany(DetallesPedido, { foreignKey: 'pedido_id' });
Pastel.hasMany(DetallesPedido, { foreignKey: 'pastel_id' });
DetallesPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });
DetallesPedido.belongsTo(Pastel, { foreignKey: 'pastel_id' });

module.exports = DetallesPedido;
