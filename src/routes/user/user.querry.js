var conn = require('../../config/db')
var bc = require('bcryptjs')

const allUser = function(req, res) {
    conn.query("SELECT * FROM user", function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            res.json(value);
        }
    });
};

const getUser = function(req, res, id) {
    conn.query("SELECT * FROM user WHERE id = ?", id, function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            if (value.length == 0) {
                conn.query("SELECT * FROM user WHERE email = ?", id, function(err, value) {
                    if (err) {
                        res.statusCode = 500
                        res.json({"msg": "internal server error"});
                    } else {
                        res.json(value);
                    }
                });
            } else {
                res.json(value);
            }
        }
    });
}

const putUser = function(req, res, id) {
    bc.hash(req.body['password'], 8, function(err, hash) {
        if (err) {
            res.statusCode = 500;
            res.json({"msg": "internal server error"});
        } else {
            conn.query("REPLACE INTO user (id, email, password, firstname, name) VALUES(?, ?, ?, ?, ?)", [id, req.body['email'], hash, req.body['firstname'], req.body['name']], function(err, value) {
                if (err) {
                    res.json({"msg": "internal server error"})
                } else {
                    conn.query("SELECT * FROM user WHERE id= ?", id, function(err, value) {
                        if (err) {
                            res.statusCode = 500
                            res.json({"msg": "internal server error"})
                        } else {
                            res.json(value);
                        }
                    })
                }
            })
        }
    });
}

const get_todos = function(req, res, id) {
    conn.query("SELECT * FROM todo WHERE user_id = ?", id, function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            res.json(value)
        }
    })
}

const deleteUser = function(req, res, id) {
    conn.query("DELETE FROM user WHERE id = ?", id, function(err, value) {
        if (err) {
            res.statusCode = 500
            res.json({"msg": "internal server error"})
        } else {
            res.json({"msg": `succesfully deleted record number: ${id}`});
        }
    })
}

module.exports = {
    allUser,
    getUser,
    putUser,
    deleteUser,
    get_todos
};