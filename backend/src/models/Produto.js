const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define('Produto', {
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  estoque: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Produto;
