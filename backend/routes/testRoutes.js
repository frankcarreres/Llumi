// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const verificarToken = require('../middlewares/verificarToken');

// Ruta protegida: solo usuarios con token pueden enviar resultados de test
router.post('/', verificarToken, testController.guardarTest);
router.patch("/:id_test/denuncia", testController.vincularDenuncia);
router.get("/usuario/me",verificarToken, testController.getTestPorIdUsuario);
router.put("/update",verificarToken, testController.actualizarTest);

module.exports = router;
