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

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/store/product", isAuthenticated, isStore, getAllProducts);

router.post(
  "/store/product/create-product",
  isAuthenticated,
  isStore,
  upload.array("productPhotos"),
  createProduct
);

router.get("/product/:productId", getProductById);

router.post("/store/product/:productId", isAuthenticated, isStore, editProduct);

router.delete(
  "/store/product/:productId",
  isAuthenticated,
  isStore,
  deleteProduct
);

module.exports = router;
