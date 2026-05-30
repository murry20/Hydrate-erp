const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/pdf', authMiddleware, roleMiddleware(['admin']), reportController.exportarPDF);
router.get('/excel', authMiddleware, roleMiddleware(['admin']), reportController.exportarExcel);

module.exports = router;
