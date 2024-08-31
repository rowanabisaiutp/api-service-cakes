const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./user.model');
const Pastel = require('./pasteles.model');

const Comentario = sequelize.define('Comentario', {
    comentario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'usuario_id'
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
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_comentario: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Comentarios',
    timestamps: false
});

// Relaciones
Usuario.hasMany(Comentario, { foreignKey: 'usuario_id' });
Pastel.hasMany(Comentario, { foreignKey: 'pastel_id' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Comentario.belongsTo(Pastel, { foreignKey: 'pastel_id' });

module.exports = Comentario;
