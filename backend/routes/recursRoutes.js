const express = require('express');
const router = express.Router();
const { syncNoticias } = require('../controllers/recursController');

// Definimos un endpoint GET para sincronizar noticias
router.get('/syncNoticias', syncNoticias);

module.exports = router;