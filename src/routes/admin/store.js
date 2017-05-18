/**
 *  门店管理
 */
const router = require('koa-router')();
const f = require('../../common/function');
const Store = require('../../models/store');

router.get('/list', async (ctx, next) => {
    let store = new Store();
    let all = await store.read({});
    console.log(all);
    Object.assign(ctx.state, {
        list: all
    });
    await ctx.render('admin/store_list', {
    });
});

router.get('/add', async (ctx, next) => {
    Object.assign(ctx.state, {
    });
    await ctx.render('admin/store_add', {
    });
})
router.post('/add', async (ctx, next) => {
    const store = new Store();
    let cname = ctx.request.body.cname;
    let name = ctx.request.body.name;
    let tel = ctx.request.body.tel;
    let address = ctx.request.body.address;
    let location = ctx.request.body.location;
    let alias = ctx.request.body.alias;
    let data = store.default();
    data.cname = cname;
    data.name = name;
    data.tel = tel;
    data.address = address;
    data.location = location;
    data.alias = alias;
    let operater = ctx.session.user;
    let result = await store.createWithLogs(data, operater);
    console.log(result);
    ctx.body = result.result;
})

router.post('/checkname', async(ctx, next) => {
    let name = ctx.request.body.name;
    let store = await new Store().readOne({name:name});
    let result = {result:"OK"};
    if (store){
        result = {result:"exist"};
    }    
    ctx.body = {
        code: 200,
        desc: "OK",
        result: result
    }
})

router.post('/source', async(ctx, next) => {
    await ctx.render('admin/store_source', {

    });
})

module.exports = router;
