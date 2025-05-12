// routes/denunciasRoutes.js
const express = require('express');
const router = express.Router();
const denunciasController = require('../controllers/denunciasController');
const verifyToken = require('../middlewares/verificarToken');

// Ruta protegida para guardar una denuncia desde Typebot
router.post('/typebot', verifyToken, denunciasController.guardarDenuncia);

// Ruta protegida para obtener las denuncias del centro autenticado
router.post('/denuncias', verifyToken, denunciasController.getDenuncias);
router.post('/denuncias/:id_denuncia', verifyToken, denunciasController.getDenunciasPorId);
router.patch('/updateEstado/:id_denuncia', verifyToken, denunciasController.updateEstado);
// Obtener id_usuario por nombre (sin token porque solo necesita el nombre)
//router.get('/usuario-id/:nombre_usuario', denunciasController.getUsuarioIdPorNombre);
router.get('/resultadoTest', verifyToken, denunciasController.getResultadoTestAutoevaluacion);

module.exports = router;
