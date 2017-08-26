'use strict'
/*
    (c) 2017 J.Motyl

    mLab Configuration for server access, URL components
*/
const path = require('path');

module.exports = {
    // the mLab server...
    hostname: 'api.mlab.com',
    // NOTE: added `databases` to the base path because the other
    // choice is `clusters`, but it isn't implemented here.
    // http://docs.mlab.com/data-api/
    basepath: '/api/1/databases',
    // not really necessary, `443` is the default
    port: 443,
    // a component of the full path
    collections: '/collections',
    // the api key query 
    apikey: '?apiKey=',
    // database query
    dbquery: '&q=',
    // options
    dbquerylimit: '&l='
};

