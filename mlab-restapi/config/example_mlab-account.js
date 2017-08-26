'use strict'
/*
    (c) 2017 J.Motyl

    mLab Configuration for server access, account info
*/
module.exports = {
    mlabapikey: 'your mLab API Key goes here',
    // don't forget the `/` !
    database:   '/testdb',
    collection: '/testcollection',
    // this limits the total quantity of documents that a 
    // query will return. this is useful when running on 
    // thin platforms. set `querylimit` to zero for the  
    // default value of 1000.
    querylimit: 0
};

