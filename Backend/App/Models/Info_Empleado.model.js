const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Empleado = require('./empleado.model'); // Asegúrate de que la ruta sea correcta

const InfoEmpleado = sequelize.define('InfoEmpleado', {
  idIE: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  empleado_Dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empleado, // La referencia al modelo de Empleado
      key: 'Dni' // Asegúrate de que la clave referenciada sea correcta
    }
  },
  Ape_Nom_Papa: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Ape_Nom_Mama: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Ape_Nom_Conyu: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Fecha_Naci_Coyu: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  Nomb_Hijo1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Nomb_Hijo2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Nomb_Hijo3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Nomb_Hijo4: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'informacion_empleado', 
  timestamps: false 
});


InfoEmpleado.belongsTo(Empleado, {
  foreignKey: 'empleado_Dni',
  targetKey: 'Dni'
});

module.exports = InfoEmpleado;