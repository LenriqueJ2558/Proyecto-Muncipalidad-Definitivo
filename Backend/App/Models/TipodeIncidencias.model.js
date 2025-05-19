const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const TipoDeIncidencias = sequelize.define('tipodeinidencias', {
  CODIGO: {
    type: DataTypes.STRING,  // Define el tipo como STRING. Cambia según tus requisitos si es necesario.
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  GENERAL: {
    type: DataTypes.STRING,  // Campo de texto para la descripción general
    allowNull: false
  },
  TIPO: {
    type: DataTypes.STRING,  // Campo de texto para el tipo de incidencia
    allowNull: false
  },
  SUBTIPO: {
    type: DataTypes.STRING,  // Campo de texto para el subtipo de incidencia
    allowNull: false
  }
}, {
  tableName: 'tipodeinidencias',  // Nombre de la tabla en la base de datos
  timestamps: false  // Desactiva las columnas de marca de tiempo (createdAt, updatedAt) si no son necesarias
});

module.exports = TipoDeIncidencias;