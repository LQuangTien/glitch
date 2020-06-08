const express = require("express");

const controller = require('../controllers/auth.controller');

var router = express.Router();

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

module.exports = router