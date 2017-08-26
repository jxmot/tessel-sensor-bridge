'use strict'
/*
    (c) 2017 J.Motyl

    tessel-sensor-bridge - Server

    Provides and API for locally networked IoT devices. Initially
    the devices were ESP8266-12E boards with DHT22 sensors. 

*/
global.apphome = __dirname;

const path = require('path');
const http = require('http');
const server = http.createServer().listen(4843);

//const qstring = require('querystring');

// https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
// https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

server.on('request', function (req, res) {

    console.log(req.method + '   ' + req.url);

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
});

