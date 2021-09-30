const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/userinput', routes);

const server = app.listen(app.get('port'), function () {
    console.log("Server is running at port", server.address().port);
});