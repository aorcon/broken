/**
 *  首页、登录页
 */
var router = require('koa-router')();

const Account = require('../models/account');


router.get('/', async (ctx, next) => {
    ctx.state = {
    };

    await ctx.render('index', {
    });
})

router.get('/login', async (ctx, next) => {
    let redirect = ctx.query.redirect;
    ctx.state = {
        redirect: redirect,
    }
    ctx.state.lum = ctx.cookies.get('lum');
    await ctx.render('login', {
    });
})

router.post('/login', async (ctx, next) => {
    let redirect = ctx.request.body.redirect;
    let mobile = ctx.request.body.mobile;
    let passwd = ctx.request.body.passwd;
    let lum = ctx.request.body.lum;
    let user = null;
    // 系统默认用户，可修改
    // TODO: if admin's password has been changed, these codes while be passed
    if (mobile === 'admin' || mobile === '13811288138'){
        if (passwd === 'mmfit001'){
            user = {
                name: 'SystemAdministrator',
                mobile: '13811288138',
                cname: '管理员',
                role: {
                    rolename: 'admin'
                }
            }
        }
    }
    if (!user){
        let account = new Account();
        let u = await account.read({});
        console.log(u);
    }

    //将用户缓存到Session中
    if (user){
        ctx.session.user = user;
        if (lum === 'lum'){
            ctx.cookies.set('lum', mobile, {signed: true});
        }else if (ctx.cookies.get('lum')){
            ctx.cookies.set('lum', "", {expires: new Date()});
        }
        if (redirect) ctx.redirect(redirect);
        else ctx.redirect('/');

    }
    
})
module.exports = router;
