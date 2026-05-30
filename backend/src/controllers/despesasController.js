const Despesa = require('../models/Despesas');

exports.listarDespesas = async (req, res) => {
  try {
    const despesas = await Despesa.findAll();
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar despesas' });
  }
};

exports.criarDespesa = async (req, res) => {
  try {
    const { descricao, valor, tipo } = req.body;
    const despesa = await Despesa.create({ descricao, valor, tipo });
    res.status(201).json(despesa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};
