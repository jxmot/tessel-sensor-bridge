'use strict'
/*
    (c) 2017 J.Motyl

    tessel-sensor-bridge - Server

    Provides and API for locally networked IoT devices. Initially
    the devices were ESP8266-12E boards with DHT22 sensors. 

*/
global.apphome = __dirname;

const path = require('path');

// prepare the routes
const routes = require(path.join(global.apphome, '/routes'));
// set up the sensor API server
const http = require('http');
const apiServer = http.createServer().listen(4843);

//////////////////////////////////////////////////////////////////////////////
// HTTPS Server - Provides an html application for viewing the sensors.
// 
// https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/
const fs = require('fs');
const https = require('https');
// use SSL certificate and key files created with openSSL
const options = {
    key: fs.readFileSync(path.join(global.apphome, '/cert/key.pem')),
    cert: fs.readFileSync(path.join(global.apphome, '/cert/cert.pem'))
};
const htmServer = https.createServer(options).listen(443);
//
//////////////////////////////////////////////////////////////////////////////

// https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
// https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

apiServer.on('request', function (req, res) {
    console.log('apiServer : ' + req.method + '   ' + req.url);
    routes.apiRouter(req, res);
});

htmServer.on('request', function (req, res) {
    console.log('htmServer : ' + req.method + '   ' + req.url);
    routes.htmRouter(req, res);
});


