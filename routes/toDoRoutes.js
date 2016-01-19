var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var todos = []; //holds all of our todos

function ToDo(title, body) {
  this.title = title;
  this.body = body;
  this.created = new Date();
  this.deleted = null;
  this.id = uuid.v4();
}
todos.push(new ToDo('Work on HTML', 'Really... go do it'), new ToDo('Angular','you need to work on angular too.'), new ToDo('DO IT', 'JUST DOOOOO IIITTTTTTT!!!!!!'));

router.use('/', function(req, res, next) {
  console.log('Hit the ToDo router.');
  next();
});

router.param('id', function(req, res, next, id) {
  for(var i = 0; i < todos.length; i++) {
    if(id === todos[i].id) {
      req.todo = todos[i];
      return next();
    }
  }
  next({err: 'Could not find that todo'});
});

// GET /api/v1/todo
router.get('/', function(req, res) {
  res.send(todos);
});

// POST /api/v1/todo
router.post('/', function(req, res) {
  var todo = new ToDo(req.body.title, req.body.body);
  todos.push(todo);
  res.send(todo);
});

router.put('/:id', function(req, res) {
  req.todo.deleted = new Date();
  res.send();
});

router.patch('/:id', function(req, res) {
  req.todo.deleted = null;
  res.send();
});

// DELETE /api/v1/todo/:id
router.delete('/:id', function(req, res) {
  todos.splice(todos.indexOf(req.todo), 1);
  res.send();
});

module.exports = router;
