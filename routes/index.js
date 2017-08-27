'use strict'
/*
    (c) 2017 J.Motyl

    Routes and database interactions
*/
const url  = require('url');
const path = require('path');
const fs   = require('fs');

const sensor = require(path.join(global.apphome, '/routes/sensor.js'));
const html   = require(path.join(global.apphome, '/routes/html.js'));

var routes = {};

// read sensor config database, extract the `name` field and use it to build
// our routes. each sensor (by name) wiill have it's own database for its
// data. For example - 
//
//    /sensors/[sensorname]_data 
//      will be: /sensors/SENSXX_data
//
//    /sensors/[sensorname]_log
//      will be: /sensors/SENSXX_log
//

// router...
routes.apiRouter = function(req, res) {
    switch(req.method)
    {
        case 'POST':
            var body = '';
            req.on('data', function (data){
                body += data;
            });
            req.on('end', function () {
                if(req.url.includes('/sensors')) {
                    sensor.datain(req, res, JSON.parse(body));
                } else {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify({message: 'bad url', url: req.url}));
                    res.end();
                }
            });
            break;

        case 'GET':
            if(req.url.includes('/init')) {
                const init = require(path.join(global.apphome, '/init/init.js'));
                init.init(function(data) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(data);
                    res.end();
                });
            } else {
                // check paths, and if valid check for query(if used)
                if(req.url.includes('/whoami')) {
                    sensor.whoami(req, res);
                } else {
                    // not needed right away
                    if(req.url.includes('/sensors')) {
                        
                    }
                }
            }
            break;

        default:
            // Method Not Allowed
            res.writeHead(405, {'Content-Type': 'text/plain','Allow': 'GET,POST'});
            res.end();
            break;
    };
};

routes.htmRouter = function(req, res) {
    switch(req.method)
    {
        case 'GET':
            if(req.url.includes('/index')) {
                showIndex(res);
            } else {
                if(req.url.includes('/favicon')) {
                    showFavicon(res);
                } else {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end();
                }
            }
            break;

        case 'POST':
            var body = '';
            req.on('data', function (data){
                body += data;
            });
            req.on('end', function () {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(JSON.parse(body)));
                res.end();
            });
            break;

        default:
            // Method Not Allowed
            res.writeHead(405, {'Content-Type': 'text/plain','Allow': 'GET,POST'});
            res.end();
            break;
    };
};

/*
    Respond with favicon.ico
*/
function showFavicon(res) {
    res.writeHead(200, {"Content-Type": "image/x-icon"});
    fs.readFile(path.join(global.apphome, '/public/favicon.ico'), function (err, content) {
        if (err) throw err;
        res.end(content);
    });
};

/*
    Respond with index.html
*/
function showIndex(res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(path.join(global.apphome, '/public/index.html'), function (err, content) {
        if (err) throw err;
        res.end(content);
    });
};

module.exports = routes;
