const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbsgs', 'root', 'sasuke2558', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  timezone: '-05:00', // <-- Esto ajusta la zona horaria a Perú
});

module.exports = sequelize;