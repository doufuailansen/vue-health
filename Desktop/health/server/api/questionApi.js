/**
 * Created by apple on 2019/3/7.
 */
const connection = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
const app = express();

app.post('/addQuestion', (req, res) => {
    var params = req.body;
    var sql = $sql.question.add;
    console.log(params);

    connection.query(sql,[params.userId,params.questionTitle,params.questionContent,params.time,params.docId], function(err, result) {
                if(err) {
                    console.log(err);
                }
                if(result) {
                    res.send(result);
                }
            })
});

app.post('/addAnswer', (req, res) => {
    var params = req.body;
    var sql = $sql.question.add_answer + "'" + params.answer + "' where QuestionId = " + params.id;

    connection.query(sql, function(err, result) {
        if(err) {
            console.log(err);
        }
        if(result) {
            res.send(result);
        }
    })
});

//查找用户提问
app.get('/search', (req, res) => {
   var params = req.query;
   var sql = $sql.question.search + "'" + params.username + "'";
   console.log(params);

   connection.query(sql, function(err, rows) {
       if(err) {
           console.log(err);
       }
       if(rows) {
           res.send(rows);
       }
   })
});

//查找所有提问
app.get('/selectAll', (req, res) => {
    var params = req.query;
    var sql = $sql.question.select_all;
    console.log(params);

    connection.query(sql, function(err, rows) {
        if(err) {
            console.log(err);
        }
        if(rows) {
            res.send(rows);
        }
    })
});

//查找医生解答
app.get('/searchAnswer', (req, res) => {
    var params = req.query;
    var sql = $sql.question.search_answer + "'" + params.username + "'";
    console.log(params);

    connection.query(sql, function(err, rows) {
        if(err) {
            console.log(err);
        }
        if(rows) {
            res.send(rows);
        }
    })
});

//查找医生解答
app.get('/searchUnsolvedAnswer', (req, res) => {
    var params = req.query;
    var sql = $sql.question.search_unsolved_answer + "'" + params.username + "'";
    console.log(params);

    connection.query(sql, function(err, rows) {
        if(err) {
            console.log(err);
        }
        if(rows) {
            res.send(rows);
        }
    })
});

app.get('/delete', (req, res) => {
    var params = req.query;
    var sql = $sql.question.delete + params.questionId;
    console.log(params);
    connection.query(sql, function(err, rows) {
        if(err) {
            console.log(err);
        }
        if(rows) {
            res.send(rows);
        }
    })
});

module.exports = app;
