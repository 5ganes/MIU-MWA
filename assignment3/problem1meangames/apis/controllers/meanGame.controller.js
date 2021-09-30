const jsonData = require('../data/games.json');
const allGames = function (req, res) {
    console.log("getting all games");
    res.status(200).json(jsonData);
}

module.exports = {
    getAllGames: allGames
};