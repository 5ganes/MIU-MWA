const mongoClient = require('mongodb').MongoClient;

const dbName = 'gamesDB';
const dbURL = 'mongodb://localhost:27017/' + dbName;
let _connection = null;

const open = function () {
    mongoClient.connect(dbURL, function (err, client) {
        if (err) {
            console.log('DB connection failed');
            return;
        }
        _connection = client.db(dbName);
        console.log("DB connection opened");
    });
};

const get = function () {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};
