const koa = require("koa");
const app = new koa();
//  koa-bodyparser 中间件不支持 form-data 类型。
const bodyParser=require('koa-bodyparser');
// const bodyParser = require("koa-body")({
//   multipart: true, // 允许上传多个文件
// });
app.use(bodyParser());

const router = require("./router"); //路由配置文件

//数据库连接
const query = require("./utils/db");

// 读取静态文件
const static = require("koa-static"); //静态资源中间件
const path = require("path"); //路径管理中间件
app.use(static(path.join(__dirname + "/assets")));

// 后端跨域 处理
const cors = require("koa2-cors");
app.use(cors());
//或者
// app.use(
//     cors({
//         origin: function (ctx) { //设置允许来自指定域名请求
//             console.log(ctx);

//             // if (ctx.url === '/test') {
//             //     return '*'; // 允许来自所有域名请求
//             // }
//             // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
//         },
//         maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//         credentials: true, //是否允许发送Cookie
//         allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//         allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//         exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
//     })
// );

// use 调用router的中间件
// router.routes() ： 启动路由
// router.allowedMethods() ：允许任何请求（get，post，put）
app.use(router.routes(), router.allowedMethods());
// 重定向，当访问根路径的时候自动跳转到主页
router.redirect("/", "/test");
// router.redirect('/','/home');
app.listen(5001, () => {
  console.log("(点击访问)server is running at http://localhost:5001");
});
