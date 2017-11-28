'use strict'
/*
    (c) 2017 J.Motyl

    Sensor Data Model

    /sensors/[sensorname]_data
    /sensors/[sensorname]_log

    POST /sensors/SENSOR01_data - body:{name:'SENSXX',temp:74.0,humi:27.4,ismetric:false}
    POST /sensors/SENSOR01_log  - body:{name:'SENSXX',msg:'init passed'}

*/
module.exports = {
    thdata: {
        temp: 0,
        humi: 0,
        ismetric: false,
        epdate: parseInt(Date.now() / 1000)
    },
    log: {
        msg: '',
        epdate: parseInt(Date.now() / 1000)
    }
};
