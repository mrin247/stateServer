const express = require("express");

const {
  createProduct,
  getProductById,
  getAllProducts,
  editProduct,
  deleteProduct,
} = require("../../controllers/store/product");
const { isAuthenticated, isStore } = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/store/product", isAuthenticated, isStore, getAllProducts);

router.post(
  "/store/product/create-product",
  isAuthenticated,
  isStore,
  createProduct
);

router.get(
  "/store/product/:productId",
  isAuthenticated,
  isStore,
  getProductById
);

router.post("/store/product/:productId", isAuthenticated, isStore, editProduct);

router.delete(
  "/store/product/:productId",
  isAuthenticated,
  isStore,
  deleteProduct
);

module.exports = router;
