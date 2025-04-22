const express = require('express');
const router = express.Router();
const arveController = require('../controllers/arve.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');

// Клиент получает свой счёт по ID заказа
router.get('/:tellimusId', verifyToken, authorizeRoll('Client'), arveController.getInvoiceByOrder);

// Клиент оплачивает счёт
router.post('/pay/:invoiceId', verifyToken, authorizeRoll('Client'), arveController.payInvoice);

module.exports = router;
