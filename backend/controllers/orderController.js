import * as orderService from '../services/orderService.js';

export const createOrder = async (req, res) => {
    try {
        const { customerId, items, region } = req.body;
        const order = await orderService.calculateAndCreateOrder(customerId, items, region);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const calculateOrder = async (req, res) => {
    try {
        const { items, region } = req.body;
        const calculation = await orderService.calculateOrderOnly(items, region);
        res.json(calculation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { createOrder, calculateOrder };
