/**
 * Created by pawan on 11/2/17.
 */
const mysql = require('mysql');

const dbconf = {
    host: 'localhost',
    user: 'pawan',
    password: 'bansal',
    database: 'mydatabase',
};

function getAllTodos(done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("SELECT * FROM todos", function (err, rows, fields) {
        if (err) throw err;
        // console.log(fields);

        done(rows);
        conn.end();
    });
}

function setTaskDone(id, done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("select done from todos where id=" + id, function (err, rows, fields) {
        if (err) throw err;

        let k =1;
        if(rows[0].done == 1){
            k=0;
        }

        conn.query("UPDATE todos set done=" + k +" WHERE id=" + id, function (err, rows, fields) {
            if (err) throw err;
            done(rows);
            conn.end();
        });

    });
}

function removeTodo(id, done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("DELETE FROM todos WHERE id=" + id, function (err, rows, fields) {
        if(err) throw err;
        done(rows);
        conn.end();
    })
}

function clearTodos(done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("DELETE FROM todos WHERE done=1", function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        done(rows);
        conn.end();
    });
}

function addTodo(task, done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    // conn.query("insert into todos (task, done) values ('" + task + "', 0)", function (err, rows, fields) {
    //     if (err) throw err;
    //     done(rows);
    //     conn.end();
    // });

    conn.query("insert into todos set ?", {task: task, done: 0} , function (err, rows, fields) {
        if (err) throw err;
        done(rows);
        conn.end();
    });
}

module.exports = {
    getAllTodos,
    setTaskDone,
    clearTodos,
    addTodo,
    removeTodo,
}