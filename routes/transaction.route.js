const express = require("express");

const controller = require('../controllers/transaction.controller');
const validate = require('../validate/transaction.validate')
var router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.getCreate);
router.post("/create", controller.postCreate);

router.get("/:id/delete", controller.getDelete);
router.post("/:id/delete", controller.postDelete);

router.get("/:id/complete", validate.getComplete, controller.getComplete);
router.post("/:id/complete", controller.postComplete);

module.exports = router