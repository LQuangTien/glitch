const express = require("express");
const multer = require('multer');

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const upload = multer({ dest: './public/uploads/'})

var router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.getCreate);
router.post("/create",
  
  validate.postCreate, 
  controller.postCreate
);

router.get("/:id/delete", controller.getDelete);
router.post("/:id/delete", controller.postDelete);

router.get("/:id/profile", controller.getProfile);
router.post("/:id/profile", validate.postProfile, controller.postProfile);

router.get("/:id/profile/avatar", controller.getAvatar);
router.post("/:id/profile/avatar", upload.single('avatar'), validate.postAvatar, controller.postAvatar);

module.exports = router