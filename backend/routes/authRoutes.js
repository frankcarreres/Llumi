// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/verificar-email', authController.verificarEmail);
router.post( '/login-centro', authController.loginCentro)


module.exports = router;
