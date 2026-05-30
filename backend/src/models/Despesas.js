const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Mantive o seu caminho original para o db.js

const Despesa = sequelize.define('Despesa', {
  descricao: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  valor: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  tipo: { 
    type: DataTypes.ENUM('fixa', 'variavel'), 
    allowNull: false 
  },
  data: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, {
  tableName: 'despesas' // Garante que a tabela no banco de dados se chamará 'despesas'
});

module.exports = Despesa;