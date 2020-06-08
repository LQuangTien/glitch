var db = require('../db')
module.exports.requireAuth = function(req, res, next){
  if(!req.cookies.userid){
    res.redirect('/auth/login');
    return
  }
  let user = db.get('users').find({id: req.cookies.userid}).value();
  if(!user) {
    res.redirect('/auth/login');
    return
  }
  if(!user.isAdmin){ 
    let transactions = db.get('transactions').filter({userid: user.id}).value();
    res.locals.transactions = transactions;
    res.locals.isAdmin = false;
  } 
  next();
}