const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AuditLog = sequelize.define('AuditLog', {
  adminId: { type: DataTypes.INTEGER, allowNull: false },
  acao: { type: DataTypes.STRING, allowNull: false },
  detalhes: { type: DataTypes.TEXT, allowNull: false },
  dataAcao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = AuditLog;
