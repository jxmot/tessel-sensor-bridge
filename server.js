'use strict'
/*
    (c) 2017 J.Motyl

    tessel-sensor-bridge - Server

    Provides and API for locally networked IoT devices. Initially
    the devices were ESP8266-12E boards with DHT22 sensors.

    There are 2 servers running, an API server (port 4843) for the
    sensors. And a web application (port 80) server.

*/
global.apphome = __dirname;

const path = require('path');

// prepare the routes
const routes = require(path.join(global.apphome, '/routes'));
//////////////////////////////////////////////////////////////////////////////
// HTTP API Server - Provides an API for sensor devices
const apiServer = require('http').createServer().listen(4843);
apiServer.on('request', function (req, res) {
    console.log('apiServer : ' + req.method + '   ' + req.url);
    routes.apiRouter(req, res);
});
//////////////////////////////////////////////////////////////////////////////
// HTTP Application Server - Provides an html app for viewing the sensors.
const htmServer = require('http').createServer().listen(80);
htmServer.on('request', function (req, res) {
    console.log('htmServer : ' + req.method + '   ' + req.url);
    routes.htmRouter(req, res);
});
