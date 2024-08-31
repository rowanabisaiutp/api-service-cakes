const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ruta a tu configuración de Sequelize

const ImagenesPasteles = sequelize.define('Imagenes_Pasteles', {
  imagen_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pastel_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Imagenes_Pasteles',
  timestamps: false
});

module.exports = ImagenesPasteles;
