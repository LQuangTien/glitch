const shortid = require('shortid');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'quangtien',
  api_key: '522183711827974',
  api_secret: 'ECRIZHvQWTtGggILa5j46MzQpi0'
});
let defaultAvatar = 'https://res.cloudinary.com/quangtien/image/upload/v1591880216/man_user_person_male_profile_avatar_icon_icon_sl1oaq.png';

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
  req.body.avatar = defaultAvatar;
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
module.exports.getProfile = (req, res) => {
  let user = db.get('users').find({id: req.params.id}).value();  
  res.render('users/profile',{
    id: req.params.id,
    user: user
  }) 
}
module.exports.postProfile = (req, res) => { 
  let user = db.get('users').find({id: req.body.id}).value(); 
  user.name = req.body.name;
  user.email = req.body.email;
  db.get('users').write();
  res.redirect('/users');
}
module.exports.getAvatar = (req, res) => {
  let user = db.get('users').find({id: req.params.id}).value();  
  res.render('users/avatar',{
    user: user
  }) 
}
module.exports.postAvatar = (req, res) => { 
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    db.get('users')
      .find({id: req.body.id})
      .assign({avatar: result.url})
      .write();
  })
  res.redirect('/users');
}