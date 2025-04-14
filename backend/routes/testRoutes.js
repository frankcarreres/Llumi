// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const verificarToken = require('../middlewares/verificarToken');

// Ruta protegida: solo usuarios con token pueden enviar resultados de test
router.post('/', verificarToken, testController.guardarTest);

module.exports = router;
