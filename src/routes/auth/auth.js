var router = require('express').Router()
var jwt = require('jsonwebtoken')
var body = require('body-parser')
var conn = require('../../config/db')
var bc = require('bcryptjs')

router.post('/', (req, res) => {
    if (req.body['email'] == null || req.body['password'] == null || req.body['firstname'] == null || req.body['name'] == null) {
        res.statusCode = 400;
        res.json({"msg": "bad request"});
        return;
    }
    var email = req.body['email'];
    var password = req.body['password'];
    var firstname = req.body['firstname'];
    var name = req.body['name'];
    conn.query("SELECT * FROM user WHERE email = ?", [email], function(err, value, field) {
        if (value.length != 0) {
            res.json({msg: "acount  already  exists"})
            return;
        } else {
            bc.hash(password, 8, function(err, hash) {
                if (err) {
                    res.statusCode = 500
                    res.json({"msg": "internal server error"});
                    return;
                } else {
                    var add = 'INSERT INTO user(email,password,name,firstname) VALUES( ?, ?, ?, ?);'
                    conn.query(add, [email, hash, name, firstname], function(err, value) {
                        if (err) {
                            res.send("error");
                        } else {
                            console.log("add");
                            var token = jwt.sign(value['insertId'], process.env.SECRET);
                            res.statusCode = 201
                            res.setHeader('authorization', token);
                            res.json({"token": token});
                        }
                    });
                }
            })
        }
    })
});

module.exports = router;
