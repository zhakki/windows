const express = require('express');
const router = express.Router();
const toodeController = require('../controllers/toode.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');

// Получить все товары (всем доступно)
router.get('/', toodeController.getAll);

// Получить конкретный товар
router.get('/:id', toodeController.getOne);

// Добавить товар (только SalesManager или Manager)
router.post('/', verifyToken, authorizeRoll(['Manager', 'SalesManager']), toodeController.create);

module.exports = router;
