// Import Packages
const jwt = require("jsonwebtoken");

// Import Models
const User = require("../models/User");

// Import Utils
const Error = require("../utils/errResponse");

// Middleware to check authentication
exports.isAuthenticated = async (req, res, next) => {
  // Get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Authorization failed", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Find user

    if (!user) {
      return next(new Error("User not found", 404));
    }

    req.user = user; //set user
    next();
  } catch (error) {
    // Error
    return next(new Error("Authorization failed", 401));
  }
};

// Middleware to check store access
exports.isStore = (req, res, next) => {
  if (req.user.role !== "store") {
    return next(new Error("Store access denied", 401));
  }
  next();
};
