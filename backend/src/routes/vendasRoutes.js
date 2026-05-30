const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.get('/', vendasController.listarVendas);
router.post('/', vendasController.registrarVenda);

module.exports = router;