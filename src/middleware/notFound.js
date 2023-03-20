var router = require('express').Router()

const nf = function(req, res, next) {
    res.status(404);
    res.send('404, page not found');
}

module.exports = nf;