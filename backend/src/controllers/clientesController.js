const Cliente = require('../models/Cliente');

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
};

exports.criarCliente = async (req, res) => {
  try {
    const { nome, empresa, email, telefone, endereco, cidade, estado } = req.body;
    const cliente = await Cliente.create({ nome, empresa, email, telefone, endereco, cidade, estado });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};
