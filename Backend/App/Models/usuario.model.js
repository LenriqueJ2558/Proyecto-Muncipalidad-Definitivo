const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const TipoUsuario = require('./Tipo_Usuario.model');
const Empleado = require ('../Models/empleado.model') 

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegúrate de que el correo sea único
      validate: {
        isEmail: true, // Validación de formato de correo electrónico
      },
    },
    last_session: {
      type: DataTypes.DATE,
      allowNull: true
    },
    empleado_Dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Empleado,  // Nombre del modelo referenciado
        key: 'Dni'       // Clave del modelo referenciado
      }
    },
    tipo_usuario_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoUsuario, // Modelo referenciado
        key: 'id'           // Clave en el modelo referenciado
      }
    }
  }, {
    tableName: 'usuario',  // Nombre de la tabla en la base de datos
    timestamps: false       // Desactiva los timestamps automáticos si no los necesitas
  });
  
  // Establecer relaciones
  Empleado.hasMany(Usuario, { foreignKey: 'empleado_Dni' });
  Usuario.belongsTo(Empleado, { foreignKey: 'empleado_Dni' });
  Usuario.belongsTo(TipoUsuario, { foreignKey: 'tipo_usuario_Id', as: 'tipoUsuario' });
  
  module.exports = Usuario;