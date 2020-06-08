const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const bookRoute = require('./routes/book.route')
const userRoute = require('./routes/user.route')
const transactionRoute = require('./routes/transaction.route')
const authRoute = require('./routes/auth.route')

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (request, response) => {
  response.render('layouts/common');
});
app.use('/auth', authRoute);
app.use('/books', authMiddleware.requireAuth, bookRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute);
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
