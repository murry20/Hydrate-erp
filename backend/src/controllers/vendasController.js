const Venda = require('../models/Venda');

exports.listarVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vendas' });
  }
};

exports.registrarVenda = async (req, res) => {
  try {
    const { produtoId, clienteId, quantidade, valorTotal } = req.body;
    const venda = await Venda.create({ produtoId, clienteId, quantidade, valorTotal });
    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
};
