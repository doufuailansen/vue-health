/**
 * Created by apple on 2019/2/3.
 */

const connection = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
const app = express();

// 连接数据库
// var conn = mysql.createConnection(models.mysql)

// conn.connect()
connection.connect(function(err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!'); //如果连接成功 控制台输出 success 了
});

// 查找所有用户信息
app.get('/select', function (req, res) {
   var sql = $sql.user.search;
   var params = req.body;
   console.log(params);
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);  //这里在页面上输出数据
    });
});

// 查找用户id
app.get('/getId', function (req, res) {
    var params = req.query;
   var sql = $sql.user.get_id + " where UserAccount = '" + params.username + "'";
   console.log(params);
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);  //这里在页面上输出数据
    });
});

// 通过用户名查找用户信息
app.get('/searchUserAccount', function (req, res) {
    var params = req.query;
    var sql = $sql.user.select_name + "'" + params.username + "'";
    console.log(params);
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);  //这里在页面上输出数据
    });
});

// 更新用户信息
app.post('/update', (req, res) => {
    var params = req.body;
    var sql = $sql.user.update + "UserPassWord = '" + params.password +"', UserName = '" + params.name + "', UserSex = '" + params.sex + "', UserPhone = '" + params.phone + "' where UserAccount = '" + params.username + "'";
    console.log(params);
    connection.query(sql,function(err,result) {
        if(err) {
            console.log(err);
        }
        if(result) {
            res.send(result);
        }
    })
});

app.post('/addUser', (req, res) => {
    var params = req.body;
    var sql_name = $sql.user.select_name + "'" + params.username + "'";
    var sql = $sql.user.add;
    console.log(params);
    connection.query(sql_name,function(err,result) {
        if(err) {
            console.log(err);
        }
        if(result[0]===undefined) {
            connection.query(sql,[params.username,params.password,params.name,params.sex,params.phone], function(err, result) {
                if(err) {
                    console.log(err);
                }
                if(result) {
                    res.send(result);
                }
            })
        }else {
            res.send('-1');    //当前注册username与数据库重复时，data返回-1
        }
    })

});

//登录
app.post('/login', (req,res) => {
    var params = req.body;
    console.log(params);
    var sql_name = $sql.user.select_name + "'" + params.username + "'";
    var sql_password = $sql.user.select_password + "'" + params.password + "'";
    // console.log(sql_name);
    connection.query(sql_name,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            res.send('-1');  //查询不出username，data返回-1
            // console.log(result);
        }else {
            connection.query(sql_password, function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result[0]===undefined) {
                    res.send('0');   //username正确后，password错误，data返回 0
                }
                else {
                    res.send(result);
                }
            })
        }
    })
});

module.exports = app;