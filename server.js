const express = require("express");
const bodyParser = require('body-parser');

const todoRoute = require('./routes/todo.route')

const app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.use('/todos', todoRoute);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
