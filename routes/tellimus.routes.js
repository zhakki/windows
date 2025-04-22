const express = require('express');
const router = express.Router();
const tellimusController = require('../controllers/tellimus.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');

// Только клиент может создавать и просматривать свои заказы
router.post('/', verifyToken, authorizeRoll('Client'), tellimusController.createOrder);
router.get('/my', verifyToken, authorizeRoll('Client'), tellimusController.getMyOrders);

// Менеджеры могут видеть всё
router.get('/all', verifyToken, authorizeRoll(['Manager', 'SalesManager']), tellimusController.getAllOrders);

module.exports = router;
