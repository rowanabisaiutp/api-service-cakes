const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./pedidos.model'); // Asegúrate de tener el modelo Pedido

const Pago = sequelize.define('Pago', {
    pago_id: {
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
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.ENUM('tarjeta', 'paypal', 'efectivo'),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('exitoso', 'fallido', 'pendiente'),
        allowNull: false
    },
    fecha_pago: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Pagos',
    timestamps: false
});

// Relación
Pedido.hasMany(Pago, { foreignKey: 'pedido_id' });
Pago.belongsTo(Pedido, { foreignKey: 'pedido_id' });

module.exports = Pago;
