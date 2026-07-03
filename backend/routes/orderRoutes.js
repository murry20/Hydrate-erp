import express from 'express';
import orderController from '../controllers/orderController.js';
const router = express.Router();

router.post('/', orderController.createOrder);
router.post('/calculate', orderController.calculateOrder);

export default router;
