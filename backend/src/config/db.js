const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // pode ser 'mysql' ou 'mariadb' também
  logging: false
});

module.exports = sequelize;
