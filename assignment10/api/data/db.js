const mongoose = require('mongoose');

require('./jobs.model');

const dbURL = process.env.DB_URL + process.env.DB;

mongoose.connect(dbURL);
mongoose.connection.on("connected", function () {
    console.log('Mongoose connected to', dbURL);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
})
mongoose.connection.on('error', function () {
    console.log('Mongoose connection error');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected by app termination');
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected by app termination');
        process.exit(0);
    });
});

process.on('SIGUSR2', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected by app termination');
        process.kill(process.pid, "SIGUSR2");
    });
});