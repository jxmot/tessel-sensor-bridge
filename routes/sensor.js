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
    //console.log(data);
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

sensor.datain = function(req, res, data) {
    //console.log(req.url);
    if(paths.isSensorPathValid(req.url)) {
        var doc = {};
        if(req.url.includes('_data')) {
            doc = Object.assign({}, {epdate: parseInt(Date.now() / 1000), temp: data.temp, humi: data.humi, ismetric: data.ismetric});
        } else {
            if(req.url.includes('_log')) {
                doc = Object.assign({}, {epdate: parseInt(Date.now() / 1000), msg: data.msg});
            } else {
                doc = Object.assign({}, {epdate: parseInt(Date.now() / 1000), data: data});
            }
        }

        var coll = paths.extractCollection(req.url);
        mLab.insertDoc(doc, function(data) {
            if(data.error === undefined) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                var _data = JSON.parse(data);
                //console.log(JSON.stringify({epdate: _data.epdate}));
                res.write(JSON.stringify({epdate: _data.epdate}));
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'doc insert error', error: data.error}));
            }
            res.end();
        }, coll);
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'bad path', url: req.url}));
        res.end();
    }
};

module.exports = sensor;

