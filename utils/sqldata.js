const fs = require("fs");

const db=require('./db')

// 运行node ./utils/sqldata.js
// 如果提示找不文件的话，可以这样写
// __dirname:代表的是【当前文件所在的目录】
const path = require("path");

// fs.readFile(mypath,(err,data) => {
//     if(err) console.log(err);
//     console.log(data.toString())
// })
// 读取文件的函数

function readFileFn(subject) {
  let mypath = path.join(__dirname, `../assets/${subject}.txt`);
  return new Promise((resolve, reject) => {
    fs.readFile(mypath, (err, data) => {
      if (err) throw err;
      resolve(data.toString());
    });
  });
}

let fn = async () => {
  let vueContent = await readFileFn("vue");
  let reactContent = await readFileFn("react");
  let angularContent = await readFileFn("angular");

  console.log(vueContent+'======')
  let data = [
    {
      id: 0,
      title: "一套框架多种平台 移动端&桌面端",
      author: "张三丰",
      date: "2013-03-22",
      imgUrl: "/images/dt.png",
      content: angularContent,
    },
    {
      id: 1,
      title: "渐进式的JavaScript 框架",
      author: "小鱼儿",
      date: "2014-04-23",
      imgUrl: "/images/dt.png",
      content: vueContent,
    },
    {
      id: 2,
      title: "一套框架多种平台 移动端&桌面端",
      author: "花无缺",
      date: "2015-05-24",
      imgUrl: "/images/dt.png",
      content: reactContent,
    },
  ];
//   根据data有多少项，来决定插入几条数据到artible表中
  data.map((val) => {
      let sql=`insert into article values (${val.id},'${val.title}','${val.author}','${val.date}','${val.imgUrl}','${val.content}')`;
      db.query(sql,(err,data) => {
          if(err) console.log(err);
          console.log(data)
      })
  })
};
fn();


/*
// 给表zixun添加数据
const data = [
    {id: 0, icon: '/images/angular.gif', subtitle: "学会用 Angular 构建应用，把这些代码和能力复用在多种不同平台的应用上", title: "一套框架多种平台 移动端&桌面端"},
    {id: 1, icon: '/images/vue.gif', subtitle: "不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩", title: "渐进式的JavaScript 框架"},
    {id: 2, icon: '/images/react.gif', subtitle: "组件逻辑使用 JavaScript 编写而非模版，你可以轻松地在应用中传递数据，并使得状态与 DOM 分离", title: "用于构建用户界面的 JavaScript 库"},
]

data.map(val=>{
    let sql = `INSERT INTO zixun VALUES (${val.id}, '${val.title}', '${val.subtitle}', '${val.icon}')`;
    db.query(sql, (err, data)=>{
        if(err) console.log(err);
        console.log(data)
    })
})

*/