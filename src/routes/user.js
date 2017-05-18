/**
 *  用于用户管理账号的操作
 */
const router = require('koa-router')();
const f = require('../common/function');
const Account = require('../models/account');

router.prefix('/user');

// login user info
router.get('/', async function (ctx, next) {
    let user = ctx.session.user;
    let account = new Account();
    let u = null;   //user info saved in db
    if (user.name == 'SystemAdministrator'){
        // sys admin
        u = await account.readOne({name:'SystemAdministrator'});
        if (u == null){
            u = user;
            let res = await account.create(user);
        }
    }else{  //normal user
        u = await account.readOne({mobile:user.mobile});
        if (u == null){
            // wtf
        }
    }
    Object.assign(ctx.state, {
        u: u
    });
    await ctx.render('userinfo', {
    });
    
});

module.exports = router;
