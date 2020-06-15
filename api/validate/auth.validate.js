const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var db = require('../../db')
module.exports.postLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = db.get('users').find({email: email}).value()
  if(user === undefined){
    return res.status(202).json({success: false, msg: "User khong ton tai"})
  }
  if(bcrypt.compareSync(password, user.password) === false){
    return res.status(202).json({success: false, msg: "Mat khau khong dung"})
  }
  const payload = {id: user.id};
  const accessToken = jwt.sign(payload, 'abcdef', {
    expiresIn: 10 * 60 * 1000,
  });
  res.status(201).json({success: true, accessToken})
}