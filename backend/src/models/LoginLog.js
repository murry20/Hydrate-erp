const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LoginLog = sequelize.define('LoginLog', {
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  dataLogin: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = LoginLog;
