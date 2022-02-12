// Import Packages
const express = require("express");

// Import Controllers
const {
  clientSignup,
  clientSignin,
  clientForgotPassword,
  clientResetPassword,
  clientSignout,
} = require("../../controllers/client/auth");

// Create router
const router = express.Router();

// Routes
router.post("/client/auth/signup", clientSignup);
router.post("/client/auth/signin", clientSignin);
router.post("/client/auth/forgot-password", clientForgotPassword);
router.put("/client/auth/reset-password/:resetToken", clientResetPassword);
router.post("/client/auth/signout", clientSignout);

// Exports
module.exports = router;
