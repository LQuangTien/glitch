const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const User = require('../models/user.model');

const saltRounds = 10;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async (req, res) => {
  let users = await User.find()
  res.render('users/index', {
   users: users
  })
}
module.exports.getCreate = (req, res) => {
  res.render('users/create')
}
module.exports.postCreate = (req, res) => {
  let newUser = new User(req.body)
  newUser.password = bcrypt.hashSync(req.body.password, saltRounds);
  newUser.save();
  res.redirect('/users');
}
module.exports.getDelete = (req, res) => {
  res.render('users/delete') 
}
module.exports.postDelete = async (req, res) => { 
  await User.findOneAndDelete({_id: req.params.id})
  res.redirect('/users');
}
module.exports.getProfile = async (req, res) => {
  let user = await User.findById(req.params.id)
  res.render('users/profile',{
    user: user
  }) 
}
module.exports.postProfile = async (req, res) => { 
  await User.findByIdAndUpdate(req.params.id,{
      name:  req.body.name,
      email: req.body.email
  }, {new: true})
  res.redirect('/users');
}
module.exports.getAvatar = async (req, res) => {
  let user = await User.findById(req.params.id);
  res.render('users/avatar',{
    user: user
  }) 
}
module.exports.postAvatar = (req, res) => { 
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    await User.findByIdAndUpdate(req.body.id, {
      avatar: result.url
    })
  }).then(() => {
    fs.unlinkSync(req.file.path);
    res.redirect('/users');
  })
}
