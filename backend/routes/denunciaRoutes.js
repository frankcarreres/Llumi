// routes/denunciasRoutes.js
const express = require('express');
const router = express.Router();
const denunciasController = require('../controllers/denunciasController');
const verifyToken = require('../middlewares/verificarToken');

// Ruta protegida para guardar una denuncia desde Typebot
router.post('/typebot', verifyToken, denunciasController.guardarDenuncia);

// Ruta protegida para obtener todas las denuncias del centro
// router.post('/', verifyToken, denunciasController.getDenuncias);

// Ruta protegida para actualizar el estado de una denuncia
// router.patch('/updateEstado/:id_denuncia', verifyToken, denunciasController.updateEstado);

module.exports = router;
