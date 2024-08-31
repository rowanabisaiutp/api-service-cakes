const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./user.model'); // Asegúrate de tener el modelo de Usuarios

const Pedido = sequelize.define('Pedido', {
    pedido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comprador_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'usuario_id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'procesando', 'completado', 'cancelado'),
        allowNull: false
    },
    direccion_envio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    metodo_envio: {
        type: DataTypes.ENUM('recojo en tienda', 'domicilio'),
        allowNull: false
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});

Pedido.belongsTo(Usuario, { foreignKey: 'comprador_id', as: 'comprador' });

module.exports = Pedido;
