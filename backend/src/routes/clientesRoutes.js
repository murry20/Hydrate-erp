const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const relatoriosController = require('../controllers/relatoriosController');

router.get('/', clientesController.listarClientes);
router.post('/', clientesController.criarCliente);

module.exports = router;

router.get('/clientes', relatoriosController.clientesMaisCompram);
