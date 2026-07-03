const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');

router.get('/', despesasController.listarDespesas);
router.post('/', despesasController.criarDespesa);

module.exports = router;
