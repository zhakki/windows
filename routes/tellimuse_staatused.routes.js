const express = require('express');
const router = express.Router();
const staatusController = require('../controllers/tellimuse_staatused.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');

// Добавить статус (только сотрудник)
router.post('/', verifyToken, authorizeRoll(['Manager', 'SalesManager']), staatusController.addStatus);

// Получить историю статусов заказа
router.get('/:id', verifyToken, staatusController.getHistory);

module.exports = router;
