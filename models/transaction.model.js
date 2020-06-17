const mongoose = require('mongoose');
var transactionSchema = new mongoose.Schema({
  isComplete: {
    type: Boolean,
    default: false
  },
  userid: String,
  bookid: String,
})
var Transaction = mongoose.model('Transaction ', transactionSchema, 'transactions');
module.exports = Transaction;
