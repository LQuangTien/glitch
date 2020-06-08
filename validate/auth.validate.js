const bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../db')
let wrongLoginCount = 0
module.exports.postLogin = (req, res, next) => {
  
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
  if(bcrypt.compareSync(password, user.password) === false) {
    wrongLoginCount++;
    console.log(wrongLoginCount)
    if(wrongLoginCount < 4){
      res.render('auth/login',{
        values: req.body
      })
    } else {
       res.render('auth/login',{
        error: ['Wrong Password'],
        values: req.body
      })
    }
   
    return;
  }

  wrongLoginCount = 0;
  res.cookie('userid', user.id);
  next()
}
  