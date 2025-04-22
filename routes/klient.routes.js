const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');
const klientController = require('../controllers/klient.controller');

// Только клиент (роль = Client)
router.get('/me', verifyToken, authorizeRoll('Client'), klientController.getMyProfile);
router.put('/me', verifyToken, authorizeRoll('Client'), klientController.updateMyProfile);

module.exports = router;
