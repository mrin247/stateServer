// Import Packages
const express = require("express");
const {
  getProductByCategory,
  getProductById,
  getAllProducts,
} = require("../../controllers/client/product");

// Import Controllers

// Create router
const router = express.Router();

// Routes
router.get("/client/allproduct", getAllProducts);
router.get("/client/product", getProductByCategory);
router.get("/client/product/:productId", getProductById);

// Exports
module.exports = router;
