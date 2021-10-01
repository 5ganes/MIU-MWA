const express = require('express');
const meanGameController = require('../controllers/meangame.controller');
const router = express.Router();

router.route('/games')
    .get(meanGameController.getGames);

module.exports = router;