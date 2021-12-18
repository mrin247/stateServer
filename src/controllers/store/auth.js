const User = require("../../models/User");

exports.storeSignup = async (req, res, next) => {
  const { firstName, lastName, email, password, contactNumber } = req.body;
  const role="store";
  const _user = new User({
    firstName,
    lastName,
    role,
    contactNumber,
    email,
    password,
  });
  try {
    await _user.save();
    res.status(201).json({
      success: true,
      _user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};

exports.storeSignin = (req, res, next) => {
  return res.status(400).json({ message: "Store Signin" });
};

exports.storeForgotPassword = (req, res, next) => {
  return res.status(400).json({ message: "Store forgot password" });
};

exports.storeResetPassword = (req, res, next) => {
  return res.status(400).json({ message: "Store reset password" });
};
