/**
 * simple session store in memory.
 */

//
//  todo : save to redis
//
// const f = require('../common/function');
let _path = "./";
let store = {};

    let func = {
    }

    func.get = async function(key){
        let value = await store[key];
        return value;
    }

    func.set = async function(key, sess, maxAge){
        store[key] = sess;
    }
    
    func.destroy = async function(key){
        if (store.hasOwnProperty(key)){
            delete store[key];
        }
    }

    let init = function(path){
        _path = path;
        return func;
    }

module.exports = init;
