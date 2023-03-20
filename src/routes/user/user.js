var router = require('express').Router()
var querry = require('./user.querry')
var auth = require('../auth/auth')
var conn = require('../../config/db')
var auth = require('../../middleware/auth')
var jwt = require('jsonwebtoken')

router.get('/', auth, (req, res) => {
    querry.allUser(req, res);
});

router.get('/todos', auth, (req, res) => {
    var tes = jwt.decode(req.headers.authorization, {complete: true}, process.env.SECRET);
    querry.get_todos(req, res, tes['payload']);
});

router.get('/:id', auth, (req, res) => {
    querry.getUser(req, res, req.params.id);
});

router.put('/:id', auth, (req, res) => {
    querry.putUser(req, res, req.params.id);
});

router.delete('/:id', auth, (req, res) => {
    querry.deleteUser(req, res, req.params.id);
});

module.exports = router;