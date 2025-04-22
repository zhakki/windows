const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt'); // 💥 Вот этого не хватало

// ✅ Регистрация клиента (открыта)
router.post('/register-klient', authController.registerKlient);

// ✅ Регистрация сотрудника (только менеджер)
router.post(
  '/register-tootaja',
  verifyToken,
  authorizeRoll('Manager'), // 🛡 Проверка роли
  authController.registerTootaja
);

// ✅ Логин (общий)
router.post('/login', authController.login);

module.exports = router;
