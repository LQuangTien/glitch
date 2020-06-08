var db = require('../db');
module.exports.getLogin = function(req, res) {
  res.render('auth/login');
}
module.exports.postLogin = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  
  let user = db.get('users').find({email: email}).value();
  if(!user) {
    res.render('auth/login',{
      error: ['Wrong Email'],
      values: req.body
    })
    return;
  }
  if(password !== user.password) {
    res.render('auth/login',{
      error: ['Wrong Password'],
      values: req.body
    })
    return;
  }
  res.cookie('userid', user.id);
  res.redirect('/')
}