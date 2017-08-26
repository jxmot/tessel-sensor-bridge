'use strict'
/*
    (c) 2017 J.Motyl

    Psuedo Models - not Mongoose models in the traditional sense, these are
    objects that represent the "schema" were using. and will provide a 
    place to 

*/
const path = require('path');

// this object will contain the model(s) and references
// to `mongoose` and its connection status.
var db = {};

// config data model - usage : var sensorCfg  = new db.config();
const db.config = require(path.join(global.apphome, '/models/config.js'));
// sensor data model - usage : var sensorData = new db.thdata();
// sensor data model - usage : var sensorLog  = new db.log();
const sensor    = require(path.join(global.apphome, '/models/sensor.js'));
const db.thdata = sensor.thdata;
const db.log    = sensor.log;

// export to the caller...
module.exports = db;
