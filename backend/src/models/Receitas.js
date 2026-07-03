const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Receita = sequelize.define('Receita', {
  descricao: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.FLOAT, allowNull: false },
  data: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Receita;
