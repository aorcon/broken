var router = require('koa-router')();
var f = require('../common/function');

router.prefix('/admin');

//检查权限，注入左侧管理项目链接
router.use(async (ctx, next) => {
    let sidebar = await getSideBar(ctx.session.user);
    Object.assign(ctx.state, {
        sidebar: sidebar
    });
    await next();
});

let user = require('./admin/user');
let store = require('./admin/store');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/store', store.routes(), store.allowedMethods());

//TODO: 增加权限检验
const getSideBar = async function(user){
    return {
        menu:[
            {title:"管理员", type:"H3"},
            {title:null, type:"group", menu:[
                {title:"管理", type:"Header"},
                {title:"用户管理", type:"menu", href:"/admin/user/list"},
                {title:"场地管理", type:"menu", href:"/admin/store/list"},
            ]},
        ]
    };
}

module.exports = router;
