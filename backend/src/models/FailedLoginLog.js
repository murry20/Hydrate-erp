const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FailedLoginLog = sequelize.define('FailedLoginLog', {
  email: { type: DataTypes.STRING, allowNull: false },
  motivo: { type: DataTypes.STRING, allowNull: false },
  dataTentativa: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = FailedLoginLog;
