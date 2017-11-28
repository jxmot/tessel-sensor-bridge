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

var sensor = {
    error: false,
    errmsg: ''
};

mLab.getAllDocs(function(data) {
    //console.log(data);
    if(!paths.createPaths(data)) {
        sensor.error = true;
        sensor.errmsg = 'createPaths() failed.'
    }
},
'config');

sensor.whoami = function(req, res) {
    if(!sensor.error && (req.url.indexOf('?') >= 0)) {
        var qobj = {macaddr: url.parse(req.url, false).query};
        // look up the mac in our database and find the name...
        mLab.queryDocs(qobj, function(doc) {
            var _doc = JSON.parse(doc);
            // there should be only one matching document
            if(_doc.length === 1) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                var sensorpath = paths.getSensorPath(_doc[0].name);
                res.write(JSON.stringify({name: _doc[0].name, altname: _doc[0].altname, interval: _doc[0].interval, ismetric: _doc[0].ismetric,paths:sensorpath.path}));
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'query results error', query: qobj, len: _doc.length}));
            }
            res.end();
        }, 'config');
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        var msg = sensor.error ? sensor.errmsg : 'missing query';
        res.write(JSON.stringify({message: msg}));
        res.end();
    }
};

sensor.datain = function(req, res, data) {
    console.log(req.url);
    if(!sensor.error && paths.isSensorPathValid(req.url)) {
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
        var msg = sensor.error ? sensor.errmsg : 'bad path';
        res.write(JSON.stringify({message: msg, url: req.url}));
        res.end();
    }
};

module.exports = sensor;

