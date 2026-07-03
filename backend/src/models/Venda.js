const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Venda = sequelize.define('Venda', {
  produtoId: { type: DataTypes.INTEGER, allowNull: false },
  clienteId: { type: DataTypes.INTEGER, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  valorTotal: { type: DataTypes.FLOAT, allowNull: false },
  data: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Venda;
