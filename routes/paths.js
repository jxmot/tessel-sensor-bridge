'use strict'
/*
    (c) 2017 J.Motyl

    Routes and database interactions
*/
const path = require('path');
const account = require(path.join(global.apphome, '/mlab-restapi/config/_mlab-account.js'));

var paths = {
    sensorpaths: []
};

var sensor = {
    //      sensorname
    name: '',
    path: {
        //    /sensors/[sensorname]_data
        data: '',
        //    /sensors/[sensorname]_log
        log: ''
    }
};

paths.createPaths = function(datastr) {
    paths.sensorpaths = [];
    var dataobj = JSON.parse(datastr);
    dataobj.forEach(function(dbsensor, index, array) {
        var newpath = Object.assign({}, sensor, 
            {
                name: dbsensor.name,
                path: {
                    data: account.database + '/' + dbsensor.name + '_data',
                    log:  account.database + '/' + dbsensor.name + '_log'
                }
            }
        );
        paths.sensorpaths[newpath.name] = JSON.parse(JSON.stringify(newpath));
    });
};

paths.getSensorPath = function(sensorname) {
    var ret = JSON.parse(JSON.stringify(paths.sensorpaths[sensorname]));
    return ret;
};

module.exports = paths;
