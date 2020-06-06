const express = require("express");
const shortid = require('shortid');

var db = require("../db");

var router = express.Router();


router.get("", (request, response) => {
  response.render('todos/index', {
    todos: db.get('todos').value()
  });
});

router.get("/search", (request, response) => {
  let q = request.query.q;
  
  let matchTodo = db.get('todos').value().filter((todo) => {
    return todo.text.toLowerCase().
              indexOf(q.toLowerCase()) !== -1;
  })
  response.render('todos/index', {
    todos: matchTodo,
    q: q
  });
});

router.get("/create", (req, res) => {
  res.render('todos/create')
})
router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('todos').push(req.body).write();
  res.redirect('/todos');
})

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;
  res.render('todos/delete',{id: id})
})
router.post("/:id/delete", (req, res) => { 
  let todos= db.get('todos').value()
  let todo = db.get('todos').find({id: req.body.id}).value();
  todos.splice(todos.indexOf(todo),1)
  res.redirect('/todos');
})

module.exports = router