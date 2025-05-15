const express = require('express');
const router = express.Router();
const { syncNoticias, getMultimedia, getNoticias, syncMultimedia, syncPodcasts, getPodcasts, postNoticias, getArticulos} = require('../controllers/recursController');
const verifyToken = require('../middlewares/verificarToken');
const multer = require("multer");
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } });

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

router.post('/addNoticia', upload.single("img"), verifyToken ,postNoticias);

// Ruta para obtener los articulos
router.get('/articulos', getArticulos);

module.exports = router;