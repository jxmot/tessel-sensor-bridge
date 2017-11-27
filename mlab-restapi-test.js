'use strict'
/*
    (c) 2017 J.Motyl

    Testing code for the mlab-restapi module.

    Comment stuff out as needed, but as-is it will test all of
    the implemented functions.
*/
global.apphome = __dirname;

const path = require('path');
const mLab = require(path.join(global.apphome, '/mlab-restapi/mlab-restapi.js'));

// list all collections in the database (specified in 
// /mlab-restapi/config/_mlab-account.js, see 
// /mlab-restapi/config/example_mlab-account.js for more information)
mLab.getCollections(function(data) {
    console.log('getCollections - ' + data);
});

// get all documents in a collection. you can pass an optional
// arg - mLab.getAllDocs(function(data, 'optional-collection')
// to choose a specfiic collection in the database. if not passed
// in then a default collection is used. it is specificied in
// /mlab-restapi/config/_mlab-account.js (see 
// /mlab-restapi/config/example_mlab-account.js for more information)
mLab.getAllDocs(function(data) {
    console.log('getAllDocs - ' + data);
});

// query for a specific document
mLab.queryDocs({_id:'SENS02'}, function(data) {
    console.log('queryDocs 1 - ' + data);
});

mLab.queryDocs({_id:'SENS01'}, function(data) {
    console.log('queryDocs 2 - ' + data);
});

// insert a document
mLab.insertDoc({_id:'SENS31',t:'33.2F',h:'59%'}, function(data) {
    console.log('insertDoc - ' + data);
    mLab.queryDocs({_id:'SENS31'},function(data) {
        console.log('queryDocs 3 - ' + data);
        var _data = JSON.parse(data);
        for(var ix = 0;ix < _data.length;ix++) {
            _data[ix].t = '39.6F';
        }
        mLab.updateDoc({_id:'SENS31'}, _data, function(data) {
            console.log('updateDoc - ' + data);
            mLab.deleteDoc('SENS31', function(data) {
                console.log('deleteDoc - ' + data);
            });
        });
    });
});

