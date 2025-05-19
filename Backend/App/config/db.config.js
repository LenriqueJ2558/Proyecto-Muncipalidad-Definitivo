const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('dbsgs', 'root', 'CIEM*2024', {
  host: 'localhost',
  dialect: 'mysql', 
  port:'3306'
});

module.exports = sequelize;
  