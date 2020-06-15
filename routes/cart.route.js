const express = require("express");

const controller = require('../controllers/cart.controller');

var router = express.Router();

router.get("/add/:bookId", controller.addToCart);
router.get('/', controller.getCart);
router.get('/payment', controller.getPayment);
module.exports = router