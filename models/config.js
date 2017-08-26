'use strict'
/*
    (c) 2017 J.Motyl

    Sensor Configuration Model

    /sensors/config-> find({macaddr: 12:34:56:78:90:12}) 


    GET /whoami?macaddr=12:34:56:78:90:12
    res {name:'SENSXX',altname:'Living Room',interval:300,ismetric:false}

*/
module.exports = {
    sensor: {
        macaddr: '00:00:00:00:00:00',
        name:    'SENSXX',
        altname: 'Living Room',
        interval: 300,
        ismetric: false
    }
};