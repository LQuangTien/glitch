// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.set('view engine', 'pug');
app.set('views', './views')
// https://expressjs.com/en/starter/basic-routing.html
const todos= [
      {id: 1, name: "Đi chợ"},
      {id: 2, name: "Nấu cơm"},
      {id: 3, name: "Rửa bát"},
      {id: 4, name: "Học code tại CodersX"}
    ]

app.get("/", (request, response) => {
  response.send("I love CodersX");
});
app.get("/todos", (request, response) => {
  response.render('todos/index', {
    todos: todos
  });
});

app.get("/todos/search", (request, response) => {
  let q = request.query.q;
  let matchTodo = todos.filter((todo) => {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
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
  todos.push(req.body);
  res.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
