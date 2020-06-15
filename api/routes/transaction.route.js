const express = require("express");

const controller = require('../controllers/transaction.controller');

var router = express.Router();

router.get("/", controller.index);
router.post("/", controller.create);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
router.patch("/:id", controller.patch);
module.exports = router;