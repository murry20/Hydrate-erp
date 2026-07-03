const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  empresa: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
  endereco: { type: DataTypes.STRING, allowNull: true },
  cidade: { type: DataTypes.STRING, allowNull: true },
  estado: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Cliente;
