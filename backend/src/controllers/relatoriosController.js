const Venda = require('../models/Venda');
const Produto = require('../models/Produto');
const Despesas = require('../models/Despesas');
const { Op } = require('sequelize');

exports.relatorioFinanceiro = async (req, res) => {
  try {
    // Total de vendas
    const vendas = await Venda.findAll();
    const totalVendas = vendas.reduce((acc, v) => acc + v.valorTotal, 0);

    // Total de despesas
    const despesas = await Despesas.findAll();
    const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

    // Lucro líquido
    const lucroLiquido = totalVendas - totalDespesas;

    // Produto mais lucrativo
    const produtos = await Produto.findAll();
    let produtoMaisLucrativo = null;
    let maiorLucro = 0;

    for (const produto of produtos) {
      const vendasProduto = vendas.filter(v => v.produtoId === produto.id);
      const receitaProduto = vendasProduto.reduce((acc, v) => acc + v.valorTotal, 0);
      if (receitaProduto > maiorLucro) {
        maiorLucro = receitaProduto;
        produtoMaisLucrativo = produto.nome;
      }
    }

    // Comparativo mensal
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const vendasMes = await Venda.findAll({ where: { data: { [Op.gte]: inicioMes } } });
    const totalMes = vendasMes.reduce((acc, v) => acc + v.valorTotal, 0);

    // Comparativo anual
    const inicioAno = new Date(agora.getFullYear(), 0, 1);
    const vendasAno = await Venda.findAll({ where: { data: { [Op.gte]: inicioAno } } });
    const totalAno = vendasAno.reduce((acc, v) => acc + v.valorTotal, 0);

    res.json({
      totalVendas,
      totalDespesas,
      lucroLiquido,
      produtoMaisLucrativo,
      totalMes,
      totalAno
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório financeiro' });
  }
};

const Cliente = require('../models/Cliente');

exports.clientesMaisCompram = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    const clientes = await Cliente.findAll();

    // Agrupar vendas por cliente
    const ranking = clientes.map(cliente => {
      const vendasCliente = vendas.filter(v => v.clienteId === cliente.id);
      const totalCompras = vendasCliente.reduce((acc, v) => acc + v.valorTotal, 0);
      return { nome: cliente.nome, empresa: cliente.empresa, totalCompras };
    });

    // Ordenar por maior valor
    ranking.sort((a, b) => b.totalCompras - a.totalCompras);

    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar ranking de clientes' });
  }
};

exports.regioesMaisVendem = async (req, res) => {
  try {
    const vendas = await Venda.findAll({ include: ['Cliente'] });

    // Agrupar vendas por região (cidade/estado do cliente)
    const ranking = {};
    vendas.forEach(v => {
      const cliente = v.Cliente;
      if (cliente) {
        const regiao = `${cliente.cidade || ''} - ${cliente.estado || ''}`;
        if (!ranking[regiao]) ranking[regiao] = 0;
        ranking[regiao] += v.valorTotal;
      }
    });

    // Converter em array ordenado
    const resultado = Object.entries(ranking)
      .map(([regiao, total]) => ({ regiao, total }))
      .sort((a, b) => b.total - a.total);

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar ranking de regiões' });
  }
};

exports.produtosMaisLucrativos = async (req, res) => {
  try {
    const vendas = await Venda.findAll({ include: ['Produto'] });

    // Agrupar vendas por produto
    const ranking = {};
    vendas.forEach(v => {
      const produto = v.Produto;
      if (produto) {
        if (!ranking[produto.nome]) ranking[produto.nome] = 0;
        ranking[produto.nome] += v.valorTotal;
      }
    });

    // Converter em array ordenado
    const resultado = Object.entries(ranking)
      .map(([produto, total]) => ({ produto, total }))
      .sort((a, b) => b.total - a.total);

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar ranking de produtos' });
  }
};

exports.relatorioFinanceiroFiltrado = async (req, res) => {
  try {
    const { inicio, fim } = req.query; // datas recebidas via query string
    const vendas = await Venda.findAll({
      where: { data: { [Op.between]: [new Date(inicio), new Date(fim)] } }
    });

    const totalVendas = vendas.reduce((acc, v) => acc + v.valorTotal, 0);

    const despesas = await Despesas.findAll({
      where: { data: { [Op.between]: [new Date(inicio), new Date(fim)] } }
    });
    const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

    const lucroLiquido = totalVendas - totalDespesas;

    res.json({ inicio, fim, totalVendas, totalDespesas, lucroLiquido });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório filtrado' });
  }
};
exports.relatorioPorCliente = async (req, res) => {
  try {
    const { clienteId } = req.query;
    const vendas = await Venda.findAll({ where: { clienteId } });
    const totalVendas = vendas.reduce((acc, v) => acc + v.valorTotal, 0);

    res.json({ clienteId, totalVendas, quantidade: vendas.length });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório por cliente' });
  }
};
exports.relatorioPorProduto = async (req, res) => {
  try {
    const { produtoId } = req.query;
    const vendas = await Venda.findAll({ where: { produtoId } });
    const totalVendas = vendas.reduce((acc, v) => acc + v.valorTotal, 0);

    res.json({ produtoId, totalVendas, quantidade: vendas.length });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório por produto' });
  }
};
