const express = require('express');
const router = express.Router();
const denunciasController = require('../controllers/denunciasController');
const verifyToken = require('../middlewares/verificarToken');

// Ruta protegida para obtener las denuncias del centro autenticado
router.post('/denuncias', verifyToken, denunciasController.getDenuncias);

module.exports = router;
