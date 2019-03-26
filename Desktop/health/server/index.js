/**
 * Created by apple on 2019/1/24.
 */
// back.js----Express服务器入口文件
var userApi = require('./api/userApi');
var doctorApi = require('./api/docApi');
var articleApi = require('./api/articleApi');
var questionApi = require('./api/questionApi');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var router = express.Router();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
});

//设置跨域访问
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res){
    res.send('Hello World!');
});

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/doctor', doctorApi);
app.use('/api/article', articleApi);
app.use('/api/question', questionApi);
app.use(router);

// 监听端口
app.listen(3000, function () {
    console.log('success listen at port:3000....');
});

