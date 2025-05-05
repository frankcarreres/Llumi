const express = require('express');
const router = express.Router();
const { syncNoticias, getMultimedia, getNoticias, syncMultimedia, syncPodcasts, getPodcasts, postNoticias } = require('../controllers/recursController');
const {get} = require("axios");

// Ruta para sincronizar noticias
router.get('/syncNoticias', syncNoticias);

// Ruta para obtener las noticias
router.get('/noticias', getNoticias);

// Ruta para sincronizar los videos
router.get('/syncMultimedia', syncMultimedia);

// Ruta para obtener las videos
router.get('/multimedia', getMultimedia);

// Ruta para sincronizar los videos de podcast
router.get('/syncPodcasts', syncPodcasts);

router.get('/podcast', getPodcasts);

router.post('/addNoticia', postNoticias);

module.exports = router;