const token = require("jsonwebtoken")
var router = require('express').Router()
var jwt = require('jsonwebtoken')
var bc = require('bcryptjs')

const auth = function(req, res, next) {
        var key = req.headers.authorization;
        if (key == null || key === "") {
                res.statusCode = 498;
                res.json({"msg": "No token, authorization denied"});
            return;
        }
        jwt.verify(key, process.env.SECRET, function(err, decoded) {
            if (err) {
                res.statusCode = 498;
                res.json({"msg": "Token is not valid"});
            }
            else
                next();
        });
        return;
}

module.exports = auth;