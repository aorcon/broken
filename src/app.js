const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session');

const ObjectID = require('mongodb').ObjectID;

const index = require('./routes/index');
const admin = require('./routes/admin');
const user = require('./routes/user');



// error handler
onerror(app);

// startup db connection pool
const db = require('./models/db');
db.connect();

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());

//static file only access in dev mode. move to nginx or cdn
app.use(require('koa-static')(__dirname + '/../p'));

//koa session setting
const sessionStore = require('./lib/session-store')(__dirname);
let session_get = sessionStore.get;
let session_set = sessionStore.set;
let session_destroy = sessionStore.destroy;
const SessionConfig = {
    key: "koa:sess",
    maxAge: 86400000,   /* 24h */
    overwrite: true,
    httpOnly: true,
    signed: true,
    store: {
        get: session_get,
        set: session_set,
        destroy: session_destroy
    }
}
//set cookies 
app.keys = ['much more workers'];
app.use(session(SessionConfig, app));

//view setting
app.use(views(__dirname + '/views', {
    map: { html: 'nunjucks' },
    options: {
        settings: {
            views: __dirname + '/views'
        }
    },
    extension: 'html'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// auth middle ware
app.use(require('./lib/userauth')({
    sessionName: {auth:'auth', user:'user'},    //save to session
    match: ['/admin','/user'],                          //match url start
    loginURL: '/login',                         //login url
    logoutURL: '/logout',                       //logout url
    userField: '/admin/user'                    //get user REST API
}));

// save session to ctx.stat
app.use(async (ctx, next) => {
    console.log(ctx.socket.remoteAddress);
    
    ctx.state.session = ctx.session;
    await next();
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());
app.use(user.routes(), user.allowedMethods());

module.exports = app;
