/**
 * simple function for project use.
 */

const crypto = require('crypto');
let func = {
}
    //md5 a string.
    //data: a string value, other type need serialized.
    func.md5 = function(data){
        return crypto.createHash('md5').update(data).digest("hex");
    }
    //salt by bytes
    func.randomBytes = function(num){
        return crypto.randomBytes(num);
    }
    //salt by string
    func.salt = function(num = 6){
        const str = '0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ';
        let salt = '';
        for (let counter = 0; counter < num; counter++) {
            salt = salt + str[Math.floor(Math.random()*str.length)];            
        }
        return salt;
    }
    func.hashPassword = function(password){
        let salt = this.salt(6);
        return salt + this.md5(salt + password);
    }
    func.validPassword = function(password, encrytedpwd){
        let salt = encrytedpwd.substring(0, 6);
        return (salt + this.md5(salt + password) === encrytedpwd);
    }
    func.addParameterToURL = function(url, name, value){
        var newURL = null;
        var value = encodeURIComponent(value);
        var regex = new RegExp("[&\\?]" + name + "=");
        if (regex.test(url)){
            regex = new RegExp("([&\\?])" + name + "=\\d+");
            newURL = url.replace(regex, "$1" + name + "=" + value);
        }else{
            if (url.indexOf("?") > -1)
                newURL = url + "&" + name + "=" + value;
            else
                newURL = url + "?" + name + "=" + value;
        }        
        return newURL;
    }
module.exports = func;
