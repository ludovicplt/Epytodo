var router = require('express').Router();
const { connect } = require('../../config/db');
var auth = require('../../middleware/auth')
const todo = require('../todos/todos.query')

router.get('/', auth, (req, res) => {
    todo.get_alltodo(req, res);
});

router.put('/:id', auth, (req, res) => {
    if (req.body['title'] == null || req.body['description'] == null || req.body['due_time'] == null || req.body['user_id'] == null || req.body['status'] == null) {
        res.json({"msg" : "bad request"});
        return;
    }
    todo.put_todo(req, res, req.params.id);
})

router.post('/', auth, (req, res) => {
    if (req.body['title'] == null || req.body['description'] == null || req.body['due_time'] == null || req.body['user_id'] == null || req.body['status'] == null) {
        res.json({"msg" : "bad request"});
        return;
    }
    todo.post_todo(req, res);
})

router.get('/:id', auth, (req, res) => {
    todo.get_todoid(req, res, req.params.id);;
})

router.delete('/:id', auth, (req, res) => {
    todo.delete_todo(req, res, req.params.id);
})

module.exports = router;