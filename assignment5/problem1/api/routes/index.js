const express = require('express');

const gamesController = require('../controllers/games.controller');

const router = express.Router();

router.route('/games')
    .get(gamesController.getGames);
router.route('/games/:gameId')
    .get(gamesController.getSingle);

module.exports = router;