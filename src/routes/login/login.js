var router = require('express').Router()
var jwt = require('jsonwebtoken')
var body = require('body-parser')
var conn =  require('../../config/db')
var bc = require('bcryptjs')

router.post('/', (req, res) => {
    if (req.body['email'] == null || req.body['password'] == null) {
        res.statusCode = 400;
        res.json({"msg": "Invalid Credentials"})
        return;
    }
    var email = req.body['email'];
    var password = req.body['password'];
    conn.query("SELECT * FROM user WHERE email = ?", email, async function(err, value, field) {
        if (value.length != 0 && await bc.compare(password, value[0]['password'])) {
            if (err) {
                res.statusCode = 500;
                res.json({"msg": "internal server error"});
                return;
            }
            var token = jwt.sign(value[0]['id'], process.env.SECRET);
            res.json({"token": token});
        } else {
            res.statusCode = 401;
            res.json({"msg": "Invalid Credentials"})
        }
    })
})

module.exports = router;