const express = require('express');

const gamesController = require('../controllers/games.controller');

const router = express.Router();

router.route('/games')
    .get(gamesController.getGames);
router.route('/games/add')
    .post(gamesController.addGame);
router.route('/games/:gameId')
    .get(gamesController.getSingle)
    .put(gamesController.updateGame)
    .delete(gamesController.deleteGame);

module.exports = router;