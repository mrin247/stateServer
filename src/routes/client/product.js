// Import Packages
const express = require("express");
const {
  getProductByCategory,
  getProductById,
} = require("../../controllers/client/product");

// Import Controllers

// Create router
const router = express.Router();

// Routes
router.get("/client/product", getProductByCategory);
router.get("/client/product/:productId", getProductById);

// Exports
module.exports = router;
