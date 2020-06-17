const Transaction = require('../models/transaction.model')
module.exports.getComplete = async function(req, res, next){
  const transaction = await Transaction.findById(req.params.id)
  !transaction.isComplete ? next() : res.redirect('/transactions');
}
