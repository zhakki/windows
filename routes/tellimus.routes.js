const express = require('express');
const router = express.Router();
const tellimusController = require('../controllers/tellimus.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');

// Только клиент может создавать и просматривать свои заказы
router.post('/', verifyToken, authorizeRoll('Client'), tellimusController.createOrder);
router.get('/my', verifyToken, authorizeRoll('Client'), tellimusController.getMyOrders);

// Менеджеры могут видеть всё
router.get('/all', verifyToken, authorizeRoll(['Manager', 'SalesManager']), tellimusController.getAllOrders);


// Получение одного заказа по ID — только менеджер или продавец
router.get('/:id', verifyToken, authorizeRoll(['Manager', 'SalesManager']), tellimusController.getOrderById);

// Менеджер назначает работника на заказ
router.put('/:id/assign-worker', verifyToken, authorizeRoll(['Manager', 'SalesManager']), tellimusController.assignWorker);


module.exports = router;
