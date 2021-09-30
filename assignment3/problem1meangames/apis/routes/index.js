const express = require('express');
const router = express.Router();

const meanGameController = require('../controllers/meanGame.controller');

router.route('/games')
    .get(meanGameController.getAllGames);

module.exports = router;