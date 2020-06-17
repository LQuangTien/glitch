const User = require("../models/user.model");
module.exports.postCreate = async function (req, res, next) {
  if (!req.body.name || req.body.name.length > 30) {
    res.render("users/profile", {
      values: req.body,
      errors: ["Name is required or must be smaller than 30"],
    });
    return;
  }
  let user = await User.find({ email: req.body.email });
  if (user.length) {
    res.render("users/profile", {
      values: req.body,
      errors: ["Email already existed"],
    });
    return;
  } else next()
};
module.exports.postProfile = async function (req, res, next) {
  if (!req.body.name || req.body.name.length > 30) {
    res.render("users/profile", {
      values: req.body,
      errors: ["Name is required or must be smaller than 30"],
    });
    return;
  }
  const userFindById = await User.findById(req.params.id);
  if (userFindById.email === req.body.email) next();
  const user = await User.find({ email: req.body.email });
  if (!user.length) {
    next();
  } else {
    res.render("users/profile", {
      values: req.body,
      errors: ["Email already existed"],
    });
    return;
  }
};
module.exports.postAvatar = function (req, res, next) {
  if (!req.file) res.redirect("/users");
  else next();
};
