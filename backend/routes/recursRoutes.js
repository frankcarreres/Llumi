const express = require('express');
const router = express.Router();
const { syncNoticias, getMultimedia, getNoticias, syncMultimedia } = require('../controllers/recursController');
// Ruta para sincronizar noticias
router.get('/syncNoticias', syncNoticias);

// Ruta para obtener las noticias
router.get('/noticias', getNoticias);

// Ruta para sincronizar los videos
router.get('/syncMultimedia', syncMultimedia);

// Ruta para obtener las videos
router.get('/multimedia', getMultimedia);

module.exports = router;