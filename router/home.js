// const Router=require('koa-router')
// const home=new Router()
// const db=require('../utils/db')

// home.get('/',async (ctx)=>{ 
//   // await 一定要记得加上 
//   // Promise 异步处理，如果要注意！
//     let data=await new Promise((resolve,reject)=>{
//       let sql=`select * from user`;
//       db.query(sql,(err,data) => {
//         if (err) user(err)
//         resolve(data)
//       })
//     })
//     ctx.body=data
//   })
exports.Posts=function(ctx)
	{
    return new Promise((resolve,reject)=>{
        try{
            let str='';
            ctx.req.on('data',function(chunk){
                str+=chunk;
            })
    
            ctx.req.on('end',function(){
                resolve(str);
            })
        }catch(err)
        {
            reject(err);
        }
    })
}
// module.exports=home