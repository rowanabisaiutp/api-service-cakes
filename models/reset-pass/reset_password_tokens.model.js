// models/reset_password_tokens.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('../user.model'); // Asegúrate de que el modelo de Usuarios esté en la ubicación correcta

const ResetPasswordToken = sequelize.define('Reset_Password_Tokens', {
    reset_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'usuario_id'
        }
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_expiracion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Reset_Password_Tokens',
    timestamps: false
});

// Definición de la asociación
ResetPasswordToken.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

module.exports = ResetPasswordToken;
