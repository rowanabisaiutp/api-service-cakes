// models/rol.js
module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
      rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'Roles',
      timestamps: false,
    });
  
    Rol.associate = (models) => {
      Rol.hasMany(models.Usuario, { foreignKey: 'rol_id' });
    };
  
    return Rol;
  };
  