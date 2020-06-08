const express = require("express");

const controller = require('../controllers/book.controller');

var router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.getCreate);
router.post("/create", controller.postCreate);

router.get("/:id/delete", controller.getDelete);
router.post("/:id/delete", controller.postDelete);

router.get("/:id/update", controller.getUpdate);
router.post("/:id/update", controller.postUpdate);

module.exports = router