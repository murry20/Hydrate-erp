const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const authMiddleware = require('../middleware/authMiddleware');

// Criamos o roleMiddleware aqui dentro para garantir que funcione sem erros de importação
const roleMiddleware = (permissoesPermitidas) => {
  return (req, res, next) => {
    if (req.usuario && permissoesPermitidas.includes(req.usuario.role)) {
      return next();
    }
    return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
  };
};

// Rota de estatísticas financeiras
router.get('/estatisticas', authMiddleware, roleMiddleware(['admin']), financeController.estatisticasFinanceiras);

module.exports = router;