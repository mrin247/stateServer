const express = require("express");
const { addItemToCart } = require("../../controllers/client/cart");
const { isAuthenticated, isClient } = require("../../middlewares/authenticate");


const router = express.Router();

router.post("/client/cart/addtocart", isAuthenticated, isClient, addItemToCart);


module.exports = router;
