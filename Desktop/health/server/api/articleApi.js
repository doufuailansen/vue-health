/**
 * Created by apple on 2019/3/3.
 */
const connection = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
const app = express();

app.get('/select', function (req, res) {
    var sql = $sql.article.search;
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

module.exports = app;