// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require("../middlewares/verificarToken");

router.get('/:id_usuario',verifyToken, userController.getUsuarioPorId);

module.exports = router;
