const games = function (req, res) {
    const dbConnection = require('../data/dbconnection');
    const db = dbConnection.get();

    let count = 6;
    if (req.query && req.query.count) {
        let noOfGames = parseInt(req.query.count);
        count = noOfGames > 9 ? 9 : noOfGames;
    }
    console.log(count);
    db.collection('games').find().limit(count).toArray(function (err, data) {
        if (err)
            console.log(err);
        res.status(200).send(data);
    });
}

module.exports = {
    getGames: games
}