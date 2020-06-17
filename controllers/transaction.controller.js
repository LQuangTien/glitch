const Transaction = require('../models/transaction.model')
const User = require('../models/user.model');
const Book = require('../models/book.model');

module.exports.index = async (req, res) => {
  if(res.locals.isAdmin === false){
    res.render("transactions/userIndex", {
      transactions: res.locals.transactions
    })
  } else {
    let transactions = await Transaction.find();
    res.render("transactions/index", {
      transactions: transactions
    })
  }
}
module.exports.getCreate = async (req, res) => {
  res.render('transactions/create', {
    users: await User.find(),
    books: await Book.find()
  })
}
module.exports.postCreate = (req, res) => {
  const newTransaction = new Transaction(req.body);
  newTransaction.save();
  res.redirect('/transactions')
}
module.exports.getDelete = (req, res) => {
  res.render('transactions/delete');
}
module.exports.postDelete = async (req, res) => {
  await Transaction.findOneAndDelete({_id: req.params.id})
  res.redirect('/transactions');
}
module.exports.getComplete = (req, res) => {
  res.render('transactions/complete');
}
module.exports.postComplete = async (req, res) => {
  await Transaction.findByIdAndUpdate(req.params.id, {
    isComplete: true
  })
 res.redirect('/transactions'); 
}
