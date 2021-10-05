require('dotenv').config({ "path": ".env" });
const express = require('express');
const path = require('path');

// mongoose db connection
require('./api/data/db');

const routes = require('./api/routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

const server = app.listen(process.env.PORT, function () {
    console.log("Server is running at port", server.address().port);
});