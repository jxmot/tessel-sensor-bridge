'use strict'
/*
    (c) 2017 J.Motyl

    Initialize any static data that the application requires.
*/
const path = require('path');
const mLab = require(path.join(global.apphome, '/mlab-restapi/mlab-restapi.js'));

const initdata = require(path.join(global.apphome, '/init/initdata.json'));
var _initdata = [];

// For triggering and handing events
const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.once('initDone', initDone);

var init = {};

// config->sensorconfigs
init.init = function(cb) {
    var itercount = 0;
    initdata.sensorconfigs.forEach(function(sensor, index, array) {
        mLab.insertDoc(sensor, function(doc) {
            //console.log(doc);
            _initdata.push(JSON.parse(doc));
            itercount += 1;
            if(itercount === array.length) eventEmitter.emit('initDone', cb);
        },
        'config');
    });
};

function initDone(cb) {
    cb(JSON.stringify(_initdata, null, 2));
};

module.exports = init;
