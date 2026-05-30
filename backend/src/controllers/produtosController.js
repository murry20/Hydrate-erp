const Produto = require('../models/Produto');

exports.listarProdutos = async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
};

exports.criarProduto = async (req, res) => {
  const { nome, preco, estoque } = req.body;
  const produto = await Produto.create({ nome, preco, estoque });
  res.status(201).json(produto);
};
