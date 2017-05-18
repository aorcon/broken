/**
 *  用户管理
 */
const router = require('koa-router')();
const f = require('../../common/function');
const Account = require('../../models/account');

const users = async function (ctx, next) {
    let account = new Account();
    let all = account.read({});
    ctx.state = {
        list: all
    }
    await ctx.render('admin/user', {
    });
    
}

router.get('/', users);

router.get('/list', async (ctx, next) => {
    let account = new Account();
    let all = await account.read({});
    console.log(all);
    console.log(ctx.state);
    Object.assign(ctx.state, {
        list: all
    });
    await ctx.render('admin/user_list', {
    });
});

router.get('/add', async (ctx, next) => {
    Object.assign(ctx.state, {
    });
    await ctx.render('admin/user_add', {
    });
})
router.post('/add', async (ctx, next) => {
    let data = {

    }

})

module.exports = router;
