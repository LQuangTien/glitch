const bcrypt = require("bcrypt");

const User = require("../models/user.model");

module.exports.postLogin = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.render("auth/login", {
      error: ["Wrong Email"],
      values: req.body,
    });
    return;
  }
  const match = bcrypt.compareSync(req.body.password, user.password);
  if (!match) {
    res.render("auth/login", {
      error: ["Wrong Password"],
      values: req.body,
    });
    return;
  }
  res.cookie("userid", user.id, {
    signed: true,
  });
  next();
};
