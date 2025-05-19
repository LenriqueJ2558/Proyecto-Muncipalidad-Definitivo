const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Empleado = require('./empleado.model'); // Asegúrate de que la ruta sea correcta

const InfoEstudio = sequelize.define('InfoEstudio', {
  idEmpleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  empleado_Dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empleado,
      key: 'Dni'
    }
  },
  Nivel_Estudio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Profe_oficio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Estudiando_en: {
    type: DataTypes.STRING
  },
  Carrera_Empleado: {
    type: DataTypes.STRING
  },
  Ciclo_Empleado: {
    type: DataTypes.STRING
  },
  Ubi_Sede: {
    type: DataTypes.STRING
  },
  Deporte: {
    type: DataTypes.STRING
  },
  Licen_A: {
    type: DataTypes.STRING
  },
  N_Licen_A: {
    type: DataTypes.STRING
  },
  Fech_Revali_A: {
    type: DataTypes.DATEONLY
  },
  Licen_B: {
    type: DataTypes.STRING
  },
  N_Licen_B: {
    type: DataTypes.STRING
  },
  Fech_Revali_B: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: 'infoestudio',
});

// Definición de la relación con Empleado
InfoEstudio.belongsTo(Empleado, {
  foreignKey: 'empleado_Dni',
  targetKey: 'Dni'
});

module.exports = InfoEstudio;