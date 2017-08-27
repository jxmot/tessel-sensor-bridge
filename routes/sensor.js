'use strict'
/*
    (c) 2017 J.Motyl

    Routes and database interactions
*/
const url  = require('url');
const path = require('path');

// get all sensor config docs and create the API paths
const mLab   = require(path.join(global.apphome, '/mlab-restapi/mlab-restapi.js'));
const paths  = require(path.join(global.apphome, '/routes/paths.js'));

mLab.getAllDocs(function(data) {
    console.log(data);
    paths.createPaths(data);
},
'config');

var sensor = {};

sensor.whoami = function(req, res) {
    if(req.url.indexOf('?') >= 0) {
        var qobj = url.parse(req.url, true).query;
        // look up the mac in our database and find the name...
        mLab.queryDocs({macaddr: qobj.mac}, function(doc) {
            var _doc = JSON.parse(doc);
            // there should be only one matching document
            if(_doc.length === 1) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                var sensorpath = paths.getSensorPath(_doc[0].name);
                res.write(JSON.stringify({name: _doc[0].name, interval: _doc[0].interval, ismetric: _doc[0].ismetric,paths:sensorpath.path}));
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'query results error', query: qobj, len: _doc.length}));
            }
            res.end();
        }, 'config');
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'missing query'}));
        res.end();
    }
};

sensor.datain = function(req, res, body) {
};

module.exports = sensor;

