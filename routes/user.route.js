const express = require("express");

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate')

var router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.getCreate);
router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.getDelete);
router.post("/:id/delete", controller.postDelete);

module.exports = router