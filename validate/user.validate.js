var db = require('../db')
module.exports.postCreate = function(req, res, next) {
  let user = db.get('users').find({email: req.body.email}).value();
  let errors = [];
  
  if(!req.body.name){
    errors.push("Name is required")
  }
  console.log(req.body.name)
  if(req.body.name.length > 30){
    errors.push("Name's length must be smaller than 30");
  }
  if(user !== undefined){
    errors.push('Email already exists');
  }
  if(errors.length){
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return;
  }
  
  next();
}
module.exports.postProfile = function(req, res, next) {
  let user = db.get('users').find({id: req.body.id}).value();
  let errors = [];
  
  if(!req.body.name){
    errors.push("Name is required")
  }
  if(req.body.name.length > 30){
    errors.push("Name's length must be smaller than 30");
  }
  if(req.body.email !== user.email){
    let user = db.get('users').find({email: req.body.email}).value();
    if(user !== undefined){
      errors.push('Email already exists');
    }
  }
  if(errors.length){
    res.render('users/profile', {
      errors: errors,
      values: req.body
    })
    console.log("errrrrrrrrrr" + req.body)
    return;
  }
  
  next();
}
module.exports.postAvatar = function(req, res, next) {
  if(!req.file)
    res.redirect('/users')
  else
    next();
}