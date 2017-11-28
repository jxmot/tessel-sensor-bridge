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
    var bRet = false;
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
        bRet = true;
    });
    return bRet;
};

paths.getSensorPath = function(sensorname) {
    if(paths.sensorpaths[sensorname] != undefined) {
        var ret = JSON.parse(JSON.stringify(paths.sensorpaths[sensorname]));
        return ret;
    } else return null;
};

paths.isSensorNameValid = function(sensorname) {
    if(paths.sensorpaths[sensorname] === undefined) return false;
    else return true;
};

paths.isSensorPathValid = function(sensorpath) {
    var sensorname = sensorpath.substr(sensorpath.lastIndexOf('/') + 1, (sensorpath.lastIndexOf('_') - sensorpath.lastIndexOf('/')) - 1);
    return paths.isSensorNameValid(sensorname);
};

paths.extractName = function(sensorpath) {
    return sensorpath.substr(sensorpath.lastIndexOf('/') + 1, (sensorpath.lastIndexOf('_') - sensorpath.lastIndexOf('/')) - 1);
};

paths.extractCollection = function(sensorpath) {
    return sensorpath.substr(sensorpath.lastIndexOf('/') + 1);
};


module.exports = paths;
