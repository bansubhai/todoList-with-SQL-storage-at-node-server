/**
 * Created by pawan on 29/1/17.
 */

const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

todos  = [{task: 'one task'}, {task: 'two task'}];

app.use('/', express.static(__dirname + "/public_html"));

app.get('/todos/get', function (req, res) {
    db.getAllTodos(function (rows) {
        res.send(rows);
    });
})

app.post('/todos/done', function (req, res) {
    db.setTaskDone(req.body.id, function () {
        res.send({"success": 'Done'});
    })
})

app.post('/todos/remove', function (req, res) {
    db.removeTodo(req.body.id, function (rows) {
        res.send("Removed successfully: " + rows.affectedRows + " rows affected!");
    })
})
app.get('/todos/clear', function (req, res) {
    db.clearTodos(function (rows) {
        res.send({"success": rows.affectedRows + " affected"});
    })
})

app.get('/todos/add', function (req, res) {
    db.addTodo(req.query.todo, function (rows) {
        res.send("Added SuccessFully! please reload page");
    })
})

app.listen(3333, function () {
    console.log('app started on http://localhost:3333/');
})