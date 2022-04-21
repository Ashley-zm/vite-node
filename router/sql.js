const Router = require('koa-router')
const sql = new Router();
const db = require('../utils/db')


sql.get('/', (ctx, next) => {
    ctx.body = 'this is a users response!'
    console.log(ctx.body);

})

sql.prefix('/test')
//查询所有用户
sql.get('/selectAllUsers.do', async (ctx) => {
    let sql = `select * from user`;
    let data = await db.query(sql);
    // ctx.body = data
    ctx.set("Content-Type", "application/json")
    ctx.body = JSON.stringify({
        code: 200,
        flag: true,
        msg: "请求成功！",
        data: data
    })
    console.log("结果", ctx);
})
module.exports = sql