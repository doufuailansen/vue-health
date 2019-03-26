/**
 * Created by apple on 2019/1/24.
 */

// 模块化后端代码
// 在 /server 下创建文件
//
// db.js 数据库连接配置
// api.js 连接数据库，各种方法实现
// sqlMap.js sql语句
// router.js 后端 express 路由配置
// back.js 后端入口文件，启动后端服务
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
    user: 'root',
    password: '567059487abc', // root 密码
    database: 'health', // 数据库名
    port: '3306'
});

module.exports = connection;
// module.exports = {
//     mysql: {
//         host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
//         user: 'root',
//         password: '567059487abc', // root 密码
//         database: 'health', // 数据库名
//         port: '3306'
//     }
// }
