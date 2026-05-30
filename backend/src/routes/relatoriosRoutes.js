const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

router.get('/financeiro', relatoriosController.relatorioFinanceiro);

module.exports = router;

router.get('/regioes', relatoriosController.regioesMaisVendem);

router.get('/produtos', relatoriosController.produtosMaisLucrativos);

router.get('/financeiro/filtrado', relatoriosController.relatorioFinanceiroFiltrado);

router.get('/financeiro/cliente', relatoriosController.relatorioPorCliente);

router.get('/financeiro/produto', relatoriosController.relatorioPorProduto);
