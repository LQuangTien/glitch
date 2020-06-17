const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
module.exports.requireAuth = async function(req, res, next){
  if(!req.signedCookies.userid){
    res.redirect('/auth/login');
    return
  }
  const user = await User.findOne({_id: req.signedCookies.userid})
  if(!user) {
    res.redirect('/auth/login');
    return
  }
  if(!user.isAdmin){ 
    let transactions = await Transaction.find({userid: user.id})
    res.locals.transactions = transactions;
    res.locals.isAdmin = false;
  } 
  res.locals.user = user;
  next();
}
