
var conn = require('../../config/db')

const get_alltodo = function(req, res) {
    conn.query("SELECT * FROM todo", function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"});
        } else  {
            res.json(value);
        }
    })
}

const post_todo = function(req, res) {
    conn.query("INSERT INTO todo(title, description, due_time, user_id, status) VALUES(?, ?, ?, ?, ?)", [req.body['title'], req.body['description'], req.body['due_time'], req.body['user_id'], req.body['status']], function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            res.json({"msg": "added todo"})
        }
    })
}

const put_todo = function(req, res, id) {
    conn.query("REPLACE INTO todo(id, title, description, due_time, user_id, status) VALUES(?, ?, ?, ?, ?, ?)", [id, req.body['title'], req.body['description'], req.body['due_time'], req.body['user_id'], req.body['status']], function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            res.json(req.body);
        }
    })
}

const get_todoid = function(req, res, id) {
    conn.query("SELECT * FROM todo WHERE id = ?", id, function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else if(value.length == 0) {
            res.json({"msg": "Not found"});
        } else {
            res.json(value);
        }
    })
}

const delete_todo = function(req, res, id) {
    conn.query("DELETE FROM todo WHERE id = ?", id, function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            res.json({"msg" : `succesfully  deleted  record  number: ${id}`})
        }
    })
}

module.exports = {
    post_todo,
    get_todoid,
    get_alltodo,
    put_todo,
    delete_todo
}