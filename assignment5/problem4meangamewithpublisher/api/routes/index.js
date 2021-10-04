const express = require('express');

const gamesController = require('../controllers/games.controller');
const publisherController = require('../controllers/publishers.controller');

const router = express.Router();

router.route('/games')
    .get(gamesController.getGames);
router.route('/games/add')
    .post(gamesController.addGame);
router.route('/games/:gameId')
    .get(gamesController.getSingle)
    .put(gamesController.updateGame)
    .delete(gamesController.deleteGame);

router.route("/games/:gameId/publisher")
    .get(publisherController.get)
    .post(publisherController.add)
    .put(publisherController.update)
    .delete(publisherController.delete);

module.exports = router;