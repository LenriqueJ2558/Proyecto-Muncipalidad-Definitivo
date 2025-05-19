const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Empleado = require('./empleado.model'); // Asegúrate de que la ruta sea correcta

const Actividad = sequelize.define('Actividad', {
  Id: {
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
  Cargo_Contrato: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cargo_Desempeño: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Turno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Base: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Modal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Entrada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Fecha_Salida: {
    type: DataTypes.DATEONLY
    // Puedes permitir valores nulos si es opcional
  },
  Peso: {
    type: DataTypes.FLOAT
    // Ajusta el tipo de dato según tus requerimientos
  },
  Estatura: {
    type: DataTypes.FLOAT
    // Ajusta el tipo de dato según tus requerimientos
  },
  Talla_Polo: {
    type: DataTypes.STRING
  },
  Talla_Pantalon: {
    type: DataTypes.STRING
  },
  Talla_Borseguies: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'actividad',
});

// Definición de la relación con Empleado
Actividad.belongsTo(Empleado, {
  foreignKey: 'empleado_Dni',
  targetKey: 'Dni'
});

module.exports = Actividad;