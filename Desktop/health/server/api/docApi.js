/**
 * Created by apple on 2019/3/1.
 */
const connection = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
const app = express();

// connection.connect(function(err) {
//     if (err) {
//         console.log('[query] - :' + err);
//         return;
//     }
//     console.log('[connection connect]  succeed!'); //如果连接成功 控制台输出 success 了
// });
app.post('/addDoctor', (req, res) => {
    var params = req.body;
    var sql_name = $sql.doctor.select_name + "'" + params.username + "'";
    var sql = $sql.doctor.add;
    console.log(params);
    connection.query(sql_name,function(err,result) {
        if(err) {
            console.log(err);
        }
        if(result[0]===undefined) {
            connection.query(sql,[params.username,params.password,params.name,params.sex,params.career,params.city,params.speciality,params.phone,params.info], function(err, result) {
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

app.get('/select', function (req, res) {
    var sql = $sql.doctor.search;
    // var params = req.body;
    // console.log(params);
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);  //这里在页面上输出数据
    });
});

app.get('/selectById', function(req, res) {
    var params = req.query;
    var sql = $sql.doctor.search + " where DocId = " + params.id;
    connection.query(sql, function (err, rows) {
        if(err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);
    });
});

app.get('/selectByName', function(req, res) {
    var params = req.query;
    var sql = $sql.doctor.search + " where DocName = '" + params.docName + "'";
    connection.query(sql, function (err, rows) {
        if(err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);
    });
});

app.get('/selectCity', function (req, res) {
    var sql = $sql.doctor.search_city;
    connection.query(sql, function (err, rows) {
        if(err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

app.get('/selectSpeciality', function (req, res) {
    var sql = $sql.doctor.search_speciality;
    connection.query(sql, function (err, rows) {
        if(err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

app.get('/searchCity', function (req, res) {
    var params = req.query;
    var sql = $sql.doctor.search + " where DocCity = " + params.city;
   connection.query(sql, function (err, rows) {
       if(err) {
           console.log(err);
           return;
       }
       console.log(rows);
       res.send(rows);
   })
});

app.get('/searchSpeciality', function (req, res) {
   var params = req.query;
   var sql = $sql.doctor.search + " where DocSepciality = " + params.speciality;
    connection.query(sql, function (err, rows) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    })
});

//查找用户接口
app.post('/login', (req,res) => {
    var params = req.body;
    console.log(params);
    var sql_name = $sql.doctor.select_name + "'" + params.username + "'";
    var sql_password = $sql.doctor.select_password + "'" + params.password + "'";
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

// 通过用户名查找用户信息
app.get('/searchDoctorAccount', function (req, res) {
    var params = req.query;
    var sql = $sql.doctor.select_name + "'" + params.username + "'";
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
    var sql = $sql.doctor.update + "DocPassWord = '" + params.password +"', DocPhone = '" + params.phone +"', DocCareer = '" + params.career +", DocCity = '" + params.city + ", DocIntro = '" + params.intro + "' where DocAccount = '" + params.username + "'";
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

module.exports = app;