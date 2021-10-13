const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    if (req.url == '/' | req.url == '/index.html') {
        renderPage('index');
    }
    else if (queryObject.page) {
        renderPage('page' + queryObject.page);
    }
    else if (req.url == '/page1.html') {
        renderPage('page1');
    }
    else if (req.url == '/page2.html') {
        renderPage('page2');
    }
    else if (req.url == '/page3.html') {
        renderPage('page3');
    }
    else {
        res.write("Invalid URL");
        res.end();
    }

    function renderPage(page) {
        fs.readFile('./pages/' + page + '.html', function (err, data) {
            if (err) {
                res.write("Error loading page");
            }
            else {
                res.write(data);
            }
            res.end();
        });
    }

});

const server = app.listen(3000, function () {
    console.log("Server runnig at port ", server.address().port);
});