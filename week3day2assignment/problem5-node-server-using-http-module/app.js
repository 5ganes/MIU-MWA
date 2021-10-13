const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject.page);

    if (!queryObject) {

    }
    if (req.url == '/' | req.url == '/index.html') {
        // if (req.query.page) {
        // res.write('req');
        // }
        // fs.readFile('./index.html', function (err, data) {
        //     if (err) {
        //         res.write("Error loading index file");
        //     }
        //     else {
        //         res.write(data);
        //     }
        // });
        res.end();
    }
    else {
        // res.write("Invalid URL");
        res.end();
    }
});

// app.on('connection', function (socket) {
//     console.log("New Connection...")
// });

const server = app.listen(3000, function () {
    console.log("Server runnig at port ", server.address().port);
});