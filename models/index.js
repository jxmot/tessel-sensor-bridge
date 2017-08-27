'use strict'
/*
    (c) 2017 J.Motyl

    Psuedo Models - not Mongoose models in the traditional sense, these are
    objects that represent the "schema" we're using. and will provide a 
    reference to the document layouts.

    TO DO: Modify the models to be "constructed".

*/
const path = require('path');

// this object will contain the model(s) and references
// to `mongoose` and its connection status.
const db = {
    config: require(path.join(global.apphome, '/models/config.js')),
    thdata: require(path.join(global.apphome, '/models/sensor.js')).thdata,
    log: require(path.join(global.apphome, '/models/sensor.js')).log
};
// export to the caller...
module.exports = db;
