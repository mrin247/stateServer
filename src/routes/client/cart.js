const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../../controllers/client/cart");
const { isAuthenticated, isClient } = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/client/cart/addtocart", isAuthenticated, isClient, addItemToCart);
router.get("/client/cart/getcart", isAuthenticated, isClient, getCartItems);
router.post(
  "/client/cart/removecartitem",
  isAuthenticated,
  isClient,
  removeCartItems
);

module.exports = router;
