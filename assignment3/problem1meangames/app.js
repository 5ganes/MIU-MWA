const express = require('express');

const routes = require('./apis/routes');

const path = require('path');

const app = express();
app.set('port', 3000);

app.use(express.static(path.join(__dirname, "public")));

app.use('/apis', routes);

const server = app.listen(app.get('port'), function () {
    console.log("Server is running at port", server.address().port);
});