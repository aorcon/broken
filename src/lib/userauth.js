
let f = require('../common/function');

var defaultOptions = {
    userField: 'user',
    rootPath: '/',
    loginPath: '/login',
    logoutPath: '/logout'
};

let matchURL = (url, matchs) => {
    let m = false;
    matchs.forEach(function(match) {
        if (url.startsWith(match)){
            m = true;
        }
    }, this);
    return m;
}

let auth = function(options){
    let match = options.match;
    let loginURL = options.loginURL || defaultOptions.loginPath;
    let logoutURL = options.logoutURL || defaultOptions.logoutPath;
    let userField = options.userField;
    let sessionName = options.sessionName;
    // var user = options.getUser(this);
    return async (ctx, next) => {
        let referer = ctx.request.header.referer;
        let url = ctx.request.url;
        let matched = matchURL(url, match);
        let user = ctx.session[sessionName.user];
        if (!matched || user){
            await next();
        }else{
            let newURL = f.addParameterToURL(loginURL, 'redirect', url);
            ctx.redirect(newURL);
        }
    }
}

module.exports = auth;
