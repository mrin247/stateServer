// Import Packages
const express = require("express");

// Import Controllers
const {
  storeSignup,
  storeSignin,
  storeForgotPassword,
  storeResetPassword,
  storeSignout,
} = require("../../controllers/store/auth");

// Create router
const router = express.Router();

// Routes
router.post("/store/auth/signup", storeSignup);
router.post("/store/auth/signin", storeSignin);
router.post("/store/auth/forgot-password", storeForgotPassword);
router.put("/store/auth/reset-password/:resetToken", storeResetPassword);
router.post("/store/auth/signout", storeSignout);

// Exports
module.exports = router;
