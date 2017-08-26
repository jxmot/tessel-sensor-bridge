'use strict'
/*
    (c) 2017 J.Motyl

    Routes and database interactions
*/
const path = require('path');
const mLab = require(path.join(global.apphome, '/mlab-restapi/mlab-restapi.js'));

const sensor_routes = require(path.join(global.apphome, '/routes/sensor.js'));
const html_routes   = require(path.join(global.apphome, '/routes/html.js'));

var routes = {};

// read sensor config database, extract the `name` field and use it to build
// our routes. each sensor (by name) wiill have it's own database for its
// data. For example - 
//    /sensors/[sensorname]_data 
//      will be: /sensors/SENSXX_data
//
//    /sensors/[sensorname]_log
//      will be: /sensors/SENSXX_log
//

// router...
routes.router = function(req, res) {
    switch(req.method)
    {
        case 'POST':
            var body = '';
            req.on('data', function (data){
                body += data;
            });
            req.on('end', function () {

                console.log(body);

                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end();
            });
            break;

        case 'GET':
            if(req.url.includes('init')) {
                const init = require(path.join(global.apphome, '/init/init.js'));
                init.init(function(data) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(data);
                    res.end();
                });
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end();
            }
            break;

        default:
            // Method Not Allowed
            res.writeHead(405, {'Content-Type': 'text/plain','Allow': 'GET,POST'});
            res.end();
            break;
    };
};

module.exports = routes;