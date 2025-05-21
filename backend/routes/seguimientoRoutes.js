const express = require('express');
const router = express.Router();
const seguimientoController = require('../controllers/seguimientoController');
const verifyToken = require("../middlewares/verificarToken");

// Crear un seguimiento para una denuncia
router.post(
  '/denuncias/:id_denuncia/seguimiento',
  verifyToken,
  seguimientoController.guardarSeguimiento
);

// Obtener todos los seguimientos de una denuncia
router.get(
  '/denuncias/:id_denuncia/seguimiento',
  verifyToken,
  seguimientoController.getSeguimientosPorDenuncia
);

module.exports = router;
