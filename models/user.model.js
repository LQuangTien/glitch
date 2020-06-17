const mongoose = require('mongoose');
const defaultAvatar = 'https://res.cloudinary.com/quangtien/image/upload/v1591880216/man_user_person_male_profile_avatar_icon_icon_sl1oaq.png';
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar:{
    type: String,
    default: defaultAvatar
  } 
})
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;
