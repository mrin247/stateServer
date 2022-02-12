const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createProduct,
  getProductById,
  getAllProducts,
  editProduct,
  deleteProduct,
} = require("../../controllers/store/product");
const { isAuthenticated, isStore } = require("../../middlewares/authenticate");
const { uploadS3 } = require("../../middlewares/aws");

const router = express.Router();

router.get("/store/product", isAuthenticated, isStore, getAllProducts);

router.post(
  "/store/product/create-product",
  isAuthenticated,
  isStore,
  uploadS3.array("productPhotos"),
  createProduct
);

router.get("/product/:productId", getProductById);

router.post(
  "/store/product/:productId",
  isAuthenticated,
  isStore,
  uploadS3.array("productPhotos"),
  editProduct
);

router.delete(
  "/store/product/:productId",
  isAuthenticated,
  isStore,
  deleteProduct
);

module.exports = router;
