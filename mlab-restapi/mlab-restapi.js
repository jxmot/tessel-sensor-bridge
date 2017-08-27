'use strict'
/*
    (c) 2017 J.Motyl

    mLab REST API Module - A very basic set of functions that will
    allow a client access to a MongoDB on mLab. 

    This code is intended for use on thin platforms such as the
    Tessel 2. 
*/
const path = require('path');
const https = require('https');

const config  = require(path.join(global.apphome, '/mlab-restapi/config/mlab-config.js'));
const account = require(path.join(global.apphome, '/mlab-restapi/config/_mlab-account.js'));

var mlabRestAPI = {};

console.log('apphome = ' + global.apphome);

mlabRestAPI.getCollections = function(cb) {

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: config.basepath + account.database + config.collections + config.apikey + account.mlabapikey,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    makeRequest(options, cb);
};

// GET /databases/{database}/collections/{collection}
mlabRestAPI.getAllDocs = function(cb, coll) {

    var collection = '';
    if(coll === undefined) collection = account.collection;
    else collection = '/' + coll;

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: config.basepath + account.database + config.collections + collection + config.apikey + account.mlabapikey,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    makeRequest(options, cb);
};

// GET /databases/{database}/collections/{collection}
// Optional parameters : ( info obtained from - http://docs.mlab.com/data-api/)
//      &q=<query>          - where <query> is a JSON string
//      &c=true             - return the result count for this query
//      &f=<fields>         - specify the set of fields to include or exclude 
//                          in each document (1 - include; 0 - exclude)
//      &fo=true            - return a single document from the result set 
//                          (same as findOne() using the mongo shell
//      &s=<order>          - specify the order in which to sort each 
//                          specified field (1- ascending; -1 - descending)
//      &sk=<skip>          - specify the number of results to skip in the 
//                          result set; useful for paging
//      &l=<limit>          - specify the limit for the number of results 
//                          (default is 1000)
// 
// https://docs.mongodb.com/manual/reference/operator/index.html
mlabRestAPI.queryDocs = function(queryobj, cb, coll) {

    var collection = '';
    if(coll === undefined) collection = account.collection;
    else collection = '/' + coll;

    var mlabquery = config.dbquery + JSON.stringify(queryobj);

    var opt = '';
    if(account.querylimit > 0) opt = config.dbquerylimit + account.querylimit;

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: config.basepath + account.database + config.collections + collection + config.apikey + account.mlabapikey + mlabquery + opt,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    makeRequest(options, cb);
};

// POST /databases/{database}/collections/{collection}
// Content-Type: application/json
// Body: <JSON data>
mlabRestAPI.insertDoc = function(dataobj, cb, coll) {

    var collection = '';
    if(coll === undefined) collection = account.collection;
    else collection =  '/' + coll;

    var postData = JSON.stringify(dataobj);

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: config.basepath + account.database + config.collections + collection + config.apikey + account.mlabapikey,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };
    makeRequest(options, cb, postData);
};

// PUT /databases/{database}/collections/{collection}/{_id}
// Content-Type: application/json 
// Body: <JSON data>
mlabRestAPI.updateDoc = function(queryobj, dataobj, cb, coll) {

    var collection = '';
    if(coll === undefined) collection = account.collection;
    else collection = '/' + coll;

    var mlabquery = config.dbquery + JSON.stringify(queryobj);
    var postData  = JSON.stringify(dataobj);

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: config.basepath + account.database + config.collections + collection + config.apikey + account.mlabapikey + mlabquery,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };
    makeRequest(options, cb, postData);
};

// DELETE /databases/{database}/collections/{collection}/{_id}
mlabRestAPI.deleteDoc = function(_id, cb, coll) {

    var collection = '';
    if(coll === undefined) collection = account.collection;
    else collection = '/' + coll;

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: config.basepath + account.database + config.collections + collection + '/' + _id + config.apikey + account.mlabapikey,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    makeRequest(options, cb);
};


//////////////////////////////////////////////////////////////////////////////
//
function makeRequest(options, cb, postdata) {
    const req = https.request(options, function(res) {
        var data = '';

        res.on('data', function(d) {
            data += d;
        });
        res.on('end', function(d) {
            cb(data);
        });
    });
    req.on('error', function(e) {
        console.error(e);
    });
    if((options.method === 'POST') || (options.method === 'PUT')) req.write(postdata);
    req.end();
};


module.exports = mlabRestAPI;

