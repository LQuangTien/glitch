// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ todos: []})
  .write()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.set('view engine', 'pug');
app.set('views', './views')
// https://expressjs.com/en/starter/basic-routing.html
const todos= [
      {id: 1, text: "Đi chợ"},
      {id: 2, text: "Nấu cơm"},
      {id: 3, text: "Rửa bát"},
      {id: 4, text: "Học code tại CodersX"}
    ]

app.get("/", (request, response) => {
  response.send("I love CodersX");
});
app.get("/todos", (request, response) => {
  response.render('todos/index', {
    todos: db.get('todos').value()
  });
});

app.get("/todos/search", (request, response) => {
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

app.get("/todos/create", (req, res) => {
  res.render('todos/create')
})
app.post("/todos/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('todos').push(req.body).write();
  res.redirect('/todos');
})

app.get("/todos/:id/delete", (req, res) => {
  let id = req.params.id;
  res.render('todos/delete',{id: id})
})
app.post("/todos/:id/delete", (req, res) => { 
  let todos= db.get('todos').value()
  let todo = db.get('todos').find({id: req.body.id}).value();
  todos.splice(todos.indexOf(todo),1)
  
  res.redirect('/todos');
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
