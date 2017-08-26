'use strict'
/*
    (c) 2017 J.Motyl

    Testing code for the mlab-restapi module
*/

const path = require('path');

const mLab = require('./mlab-restapi/mlab-restapi.js');

mLab.getCollections(function(data) {
    console.log(data);
});

mLab.getAllDocs(function(data) {
    console.log(data);
});

mLab.queryDocs({_id:'SENS02'}, function(data) {
    console.log(data);
});

mLab.queryDocs({_id:'SENS01'}, function(data) {
    console.log(data);
});

mLab.insertDoc({_id:'SENS31',t:'33.2F',h:'59%'}, function(data) {
    console.log(data);
    mLab.queryDocs({_id:'SENS31'},function(data) {
        console.log(data);
        var _data = JSON.parse(data);
        for(var ix = 0;ix < _data.length;ix++) {
            _data[ix].t = '39.6F';
        }
        mLab.updateDoc({_id:'SENS31'}, _data, function(data) {
            console.log(data);
            mLab.deleteDoc('SENS31', function(data) {
                console.log(data);
            });
        });
    });
});

