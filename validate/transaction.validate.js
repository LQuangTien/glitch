var db = require("../db");
module.exports.getComplete = function(req, res, next){
  let id = req.params.id;
  let transaction = db.get('transactions').find({id: id}).value();
  if(transaction) {
    res.locals.id = id;
    next();
  } else {
    res.redirect('/transactions'); 
  } 
}