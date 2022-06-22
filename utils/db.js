// 数据连接配置
const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'vite_node',
    user: 'root',
    password: 'password'
})
function query(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                console.log("数据库连接失败")
            } else {
                //连接成功才查询
                console.log("数据库连接成功")
                connection.query(sql, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    //关闭connection
                    connection.release();
                });
            }
        });
    })
}
exports.query = query;