const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');


const Empleado = sequelize.define('empleado', {
  Dni: {
    type: DataTypes.INTEGER, // Cambiar a BIGINT para soportar números grandes
    allowNull: false,
    primaryKey: true,
    unique: true,
    require: true
  },
  Nombre_Empleado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Apellido_Empleado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sexo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Telefono_Empleado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Correo_Electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Lugar_de_Nacimiento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Tipo_Sangre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Estado_Civil: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Foto: {
    type: DataTypes.STRING,
    allowNull: true
  },
 },{
    tableName: 'empleado',
  
  
});



module.exports = Empleado;