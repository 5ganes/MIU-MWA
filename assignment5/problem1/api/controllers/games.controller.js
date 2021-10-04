const mongoose = require('mongoose');

const Game = mongoose.model('Game');

const getGames = function (req, res) {
    let offset = 0;
    let count = 5;
    const maxCount = 15;
    if (req.query) {
        if (req.query.count)
            count = parseInt(req.query.count);
        if (req.query.offset)
            offset = parseInt(req.query.offset);
    }
    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({
            err: "Please enter valid API url"
        });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({
            message: "Cannot exceed count of " + maxCount
        });
        return;
    }

    Game.find().skip(offset).limit(count).sort({ 'title': 1 }).exec(function (err, games) {
        if (err) {
            console.log('Error finding games');
            res.status(500).json(err);
            return;
        }
        if (games.length == 0) {
            res.status(400).json({
                message: "No games found"
            });
            return;
        }
        console.log('Games found. Total', games.length);
        res.json(games);
    });
};

const getSingle = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Given gameId is not valid");
        res.status(400).json({
            "message": "Given gameId is not valid"
        });
        return;
    }
    const game = Game.findOne({ _id: gameId }).exec(function (err, game) {
        // Game.findById(gameId) can also be used
        if (err) {
            console.log('Error finding games');
            res.status(500).json(err);
            return;
        }
        if (game) {
            console.log('Game found : ', game);
            res.status(200).json(game);
        }
        else {
            console.log('No game found with given gameId : ', gameId);
            res.status(400).json({
                "message": "No game found with given gameId - " + gameId
            });
        }
    });
}

module.exports = {
    getGames: getGames,
    getSingle: getSingle
}