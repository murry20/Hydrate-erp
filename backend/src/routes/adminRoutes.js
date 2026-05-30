const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Importa o authMiddleware (ajuste para '../middlewares/...' se sua pasta for no plural)
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

// 👥 Rotas de Gerenciamento de Usuários
router.get('/usuarios', authMiddleware, roleMiddleware(['admin']), adminController.listarUsuarios);
router.put('/usuarios/:id/role', authMiddleware, roleMiddleware(['admin']), adminController.atualizarRole);
router.delete('/usuarios/:id', authMiddleware, roleMiddleware(['admin']), adminController.excluirUsuario);

// 📊 Rotas de Estatísticas e Monitoramento do Painel Admin
router.get('/estatisticas', authMiddleware, roleMiddleware(['admin']), adminController.estatisticas);
router.get('/estatisticas-login', authMiddleware, roleMiddleware(['admin']), adminController.estatisticasLogin);
router.get('/atividade-recente', authMiddleware, roleMiddleware(['admin']), adminController.atividadeRecente);

// 📜 Rotas de Logs do Sistema (Banco de Dados / Segurança)
router.get('/logs', authMiddleware, roleMiddleware(['admin']), adminController.listarLogs);
router.get('/falhas-login', authMiddleware, roleMiddleware(['admin']), adminController.listarFalhasLogin);

// Sempre no FINAL do arquivo para exportar TODAS as rotas acima!
module.exports = router;