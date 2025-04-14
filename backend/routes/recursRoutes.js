const express = require('express');
const router = express.Router();
const { syncNoticias } = require('../controllers/recursController');
const { getNoticias } = require('../controllers/recursController');

// Ruta para sincronizar noticias
router.get('/syncNoticias', syncNoticias);

// Ruta para obtener las noticias
router.get('/noticias', getNoticias);

module.exports = router;