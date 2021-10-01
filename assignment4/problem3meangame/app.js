const express = require('express');

// connect to database
require('./apis/data/dbconnection').open();

const path = require('path');
const routes = require('./apis/routes/index');

const app = express();
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/apis', routes);

const server = app.listen(app.get('port'), function () {
    console.log("Server is running at port", server.address().port);
});