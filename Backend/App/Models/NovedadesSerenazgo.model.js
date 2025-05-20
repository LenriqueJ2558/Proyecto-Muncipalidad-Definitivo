const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Usuario = require('./usuario.model'); // importa tu modelo Usuario

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
  usuarioId: {  // <-- nuevo campo
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'NovedadesSerenazgo',
  timestamps: false,
});

// Asociación con Usuario
NovedadesSerenazgo.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(NovedadesSerenazgo, { foreignKey: 'usuarioId' });

module.exports = NovedadesSerenazgo;