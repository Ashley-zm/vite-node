const Router=require('koa-router');
const router=new Router();

// 注册路由
const sql=require('./sql')
router.use(sql.routes(),sql.allowedMethods())
// const list=require('./list')
// const home=require('./home')
// router.use('/home',home.routes(),home.allowedMethods())
// router.use('/home/list',list.routes(),list.allowedMethods())


//路由的重定向 
// 如果前端还是访问了http://localhost:5050/，
// 后端依然给它重定向到 /home 下的某个路由
// router.redirect('/','/home')

// 导出router给app.js使用
module.exports=router