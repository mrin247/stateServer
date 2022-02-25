const express = require("express");
const {
  addItemToCart,
  getCartItems,
} = require("../../controllers/client/cart");
const { isAuthenticated, isClient } = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/client/cart/addtocart", isAuthenticated, isClient, addItemToCart);
router.get("/client/cart/getcart", isAuthenticated, isClient, getCartItems);

module.exports = router;
