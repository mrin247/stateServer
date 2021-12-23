// Import Packages
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// User model Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "store", "admin"],
      default: "store",
    },
    contactNumber: String,
    profilePhoto: String,
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

// User model middlewares
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// User model methods
userSchema.methods = {
  authenticate: async function (password) {
    return bcrypt.compare(password, this.password);
  },
  getSignedToken: function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  },
  setResetPasswordToken: function () {
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    this.resetToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");

    this.resetTokenExpiration = Date.now() + 60 * (60 * 1000);

    return resetPasswordToken;
  },
};

// Export User Model
module.exports = mongoose.model("User", userSchema);
