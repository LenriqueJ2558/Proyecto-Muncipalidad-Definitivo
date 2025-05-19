const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const NovedadesCamara = sequelize.define('novedadesCamara', {
  idNovedades: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  NombreSupervisor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NombreOperador: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Turno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  GeneralDeNovedades: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TipoDeNovedades: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SubTipoNovedades: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NumeroDeEstacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DescripciondeNovedad: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Foto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  UrlVideo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ubicacion_novedades: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hora_novedades: {
    type: DataTypes.TIME,
    allowNull: false
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UbiCamara: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Lat: {
    type: DataTypes.STRING, // Cambiar a DOUBLE si necesitas mayor precisión
    allowNull: false
  },
  Longitud: {
    type: DataTypes.STRING, // Cambiar a DOUBLE si necesitas mayor precisión
    allowNull: false
  },
  Localizacion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'novedades_Camaras',
});

module.exports = NovedadesCamara;