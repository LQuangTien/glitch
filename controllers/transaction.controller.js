const shortid = require('shortid');

var db = require("../db");

let transactions = db.get('transactions').value();
let users = db.get('users').value()
let books = db.get('books').value()

module.exports.index = (req, res) => {
  if(res.locals.isAdmin === false){
    res.render("transactions/userIndex", {
      transactions: res.locals.transactions
    })
  } else {
    res.render("transactions/index", {
      transactions: transactions
    })
  }
  
}
module.exports.getCreate =  (req, res) => {
  res.render('transactions/create', {
    users: users,
    books: books
  })
}
module.exports.postCreate = (req, res) => {
  req.body.isComplete = false;
  req.body.id = shortid.generate(); 
  db.get('transactions').push(req.body).write();
  res.redirect('/transactions')
}
module.exports.getDelete = (req, res) => {
  let id = req.params.id;
  res.render('transactions/delete', {id: id});
}
module.exports.postDelete = (req, res) => {
  let transaction = db.get('transactions').find({id: req.body.id}).value();
  transactions.splice(transactions.indexOf(transaction),1);
  db.get('transactions').write();
  res.redirect('/transactions');
}
module.exports.getComplete = (req, res) => {
  res.render('transactions/complete', {id: res.locals.id});
}
module.exports.postComplete = (req, res) => {
  let transaction = db.get('transactions').find({id: req.body.id}).value();
  console.log(transaction)
  if(transaction){
    transaction.isComplete = true;
    db.get('transactions').write();    
  }
   res.redirect('/transactions'); 
}
