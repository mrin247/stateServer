// Import Packages
const express = require("express");
const { getProductByCategory } = require("../../controllers/client/product");

// Import Controllers


// Create router
const router = express.Router();

// Routes
router.get("/client/product", getProductByCategory);

// Exports
module.exports = router;