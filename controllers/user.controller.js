const shortid = require('shortid');
const bcrypt = require('bcrypt');

var db = require("../db");

let users = db.get('users').value();
const saltRounds = 10;

module.exports.index = (request, response) => {
  response.render('users/index', {
    users: db.get('users').value()
  });
}
module.exports.getCreate = (req, res) => {
  res.render('users/create')
}
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.isAdmin = false;
  db.get('users').push(req.body).write();
  res.redirect('/users');
}
module.exports.getDelete = (req, res) => {
  let id = req.params.id;
  res.render('users/delete',{id: id}) 
}
module.exports.postDelete = (req, res) => { 
  let user = db.get('users').find({id: req.body.id}).value();  
  users.splice(users.indexOf(user),1);
  db.get('users').write();
  res.redirect('/users');
}