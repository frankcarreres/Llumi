const express = require('express');
const router = express.Router();
const { getTypebotResult } = require('../controllers/typebotController');

router.get('/result/:resultId', getTypebotResult);

module.exports = router;
