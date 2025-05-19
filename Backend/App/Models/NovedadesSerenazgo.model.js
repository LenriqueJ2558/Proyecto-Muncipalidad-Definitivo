const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Asegúrate de ajustar la ruta a tu archivo db.js



const NovedadesSerenazgo = sequelize.define('NovedadesSerenazgo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  latitud: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitud: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'NovedadesSerenazgo',
  timestamps: false,  // Desactiva los timestamps automáticos si no los necesitas
});

module.exports = NovedadesSerenazgo;