const Router = require("koa-router");
const sql = new Router();
const db = require("../utils/db.js");

//token
const jwt = require("jsonwebtoken"); //引入jwt模块（生成token）
// const koa_jwt = require("koa-jwt")//接收请求头传递的token
const secret = "userlogin"; // 这是加密的key（密钥）用来解密
// const need_Token = koa_jwt({secret})

sql.get("/", (ctx, next) => {
    ctx.body = "this is a users response!";
    console.log(ctx.body);
});
sql.prefix("/vite");

//api  查询所有用户
sql.get("/selectAllUsers.do", async (ctx) => {
    ctx.set("Content-Type", "application/json");
    let sql = `select * from user`;
    let data = await db.query(sql);
    //   解密
    const token = ctx.request.header.token
    if (token !== 'null') {
        try {
            var decoded = jwt.verify(token, secret);
          } catch(err) {
            // err
          }
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                if(err.name==='TokenExpiredError'){
                    ctx.body = JSON.stringify({
                        code: 400,
                        flag: false,
                        msg: "token 登录过期！",
                    });
                }else if(err.name==='JsonWebTokenError'){
                    ctx.body = JSON.stringify({
                        code: 400,
                        flag: false,
                        msg: "无效 token！",
                    });
                }
            } else {
                ctx.body = JSON.stringify({
                    code: 200,
                    flag: true,
                    msg: "请求成功！",
                    data: data,
                });
                return decoded
            }
        })
    } else {
        ctx.body = JSON.stringify({
            code: 400,
            flag: false,
            msg: "token 失效！",
        });
    }

});
sql.get("/selectAllUsers1.do", async (ctx) => {
    //   await 一定要记得加上
    //   Promise 异步处理，如果有的话要注意！
    let data = await new Promise((resolve, reject) => {
        let sql = `select * from user`;
        db.query(sql, (err, data) => {
            if (err) user(err);
            resolve(data);
        });
    });
    ctx.body = data;
});

//api   用户登录
sql.post("/UserLogin.do", async (ctx) => {
    let { userName, password } = ctx.request.body;
    let sql = `select * from user WHERE loginName='${userName}' AND password='${password}';`;
    let data = await db.query(sql);
    if (data.length > 0) {
        // jwt.sign(payload,secret,expiresIn)
        // 1.其中payload是需要保存的数据
        // 2.secret密匙，在设置token和解析token的时候都需要用到
        // 3.expiresIn可以设置过期的时间
        let token = jwt.sign({ data: userName }, secret, {
            expiresIn: '30s', // 1小时过期
            //   expiresIn: 60 * 60 * 1, // 1小时过期
        });
        ctx.body = JSON.stringify({
            code: 200,
            flag: true,
            msg: "请求成功！",
            data: data,
            token,
        });
        console.log(ctx.body, data);
    } else {
        ctx.body = JSON.stringify({
            code: 400,
            flag: false,
            msg: "用户名或密码错误！",
            data: data,
        });
    }
});
module.exports = sql;
