const express = require('express');

const app = express();
app.set('port', 5353);

const server = app.listen(app.get('port'), function () {
    console.log("Server is runnig at port ", server.address().port);
});