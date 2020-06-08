var db = require('../db')
module.exports.postCreate = function(req, res, next) {
  let user = db.get('users').find({email: req.body.email}).value();
  let errors = [];
  
  if(!req.body.name){
    errors.push("Name is required")
  }
  if(req.body.name.length > 30){
    errors.push("Name's length must be smaller than 30");
  }
  if(user){
    errors.push('Email already exists');
  }
  console.log(errors)
  if(errors.length){
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return;
  }
  
  next();
}