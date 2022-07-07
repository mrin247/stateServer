// Import Packages
const crypto = require("crypto");

// Import Models
const User = require("../../models/User");

// Import middlewares
const Error = require("../../utils/errResponse");
const { sendEmail } = require("../../utils/sendEmail");

// Signup controller
exports.clientSignup = async (req, res, next) => {
  // Destructure inputs
  const {
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    address,
    state,
    pin,
  } = req.body;

  // Existing User
  const userExists = await User.findOne({ email });
  if (userExists) {
    next(new Error("User Already Exists", 400));
  }

  const role = "client"; // set Role

  // Create New User obkect
  const _user = new User({
    firstName,
    lastName,
    role,
    contactNumber,
    address,
    state,
    pin,
    email,
    password,
  });

  try {
    await _user.save(); // save user to DB
    sendToken(_user, 201, res); // return sucsess
  } catch (error) {
    // Error
    console.log(error);
    next(error);
  }
};

// Signin controller
exports.clientSignin = async (req, res, next) => {
  // Destructure Inputs
  const { email, password } = req.body;

  // Check Email& Password
  if (!email || !password) {
    return next(new Error("Please provide email & password", 401));
  }

  const role = "client"; // set Role for check

  try {
    // Find existing user with the same email
    const _user = await User.findOne({ email }).select("+password");
    if (!_user) {
      return next(new Error("Invalid credentials", 401));
    }

    // Check Password
    const isPassword = await _user.authenticate(password);
    if (!isPassword) {
      return next(new Error("Password Invalid", 401));
    }

    // Check Role
    if (isPassword && _user.role == role) {
      sendToken(_user, 200, res);
    }
  } catch (error) {
    // Error
    next(error);
  }
};

// Signout Controller
exports.clientSignout = async (req, res) => {
  await res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};

// Forgot-Password Controller
exports.clientForgotPassword = async (req, res, next) => {
  // Destructure Inputs
  const { email } = req.body;

  try {
    // Find Existing user with the email
    const _user = await User.findOne({ email });
    if (!_user) {
      next(new Error("Email could not be sent", 400));
    }

    // Set Token for password reset
    const resetPasswordToken = _user.setResetPasswordToken();

    await _user.save(); // Update User

    // Create email
    const resetURL = `http://${process.env.CLIENT_CUSTOMER_URL}/reset-password/${resetPasswordToken}`;
    const message = `
    <h1>Reset Password</h1>
    <a href=${resetURL} clickTracking=Off>${resetURL}</a>
    `;

    try {
      // Send Email
      await sendEmail({
        to: _user.email,
        subject: "Password Reset",
        text: message,
      });

      // Send success
      res.status(200).json({
        success: true,
        data: "Email Sent",
      });
    } catch (error) {
      // Reset User
      _user.resetToken = undefined;
      _user.resetTokenExpiration = undefined;
      _user.save();

      // Error
      next(new Error("Email could not be sent", 500));
    }
  } catch (error) {
    // Error
    next(error);
  }
};

// Reset Password Controller
exports.clientResetPassword = async (req, res, next) => {
  // Destructure Inputs
  const resetToken = req.params.resetToken;
  const password = req.body.password;

  // Hask token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  try {
    // Find Existing User with hashed token & expiration
    const _user = await User.findOne({
      resetToken: resetPasswordToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!_user) {
      next(new Error("Token Expired", 400));
    }

    // Set New Password & Reset tokens
    _user.password = password;
    _user.resetToken = undefined;
    _user.resetTokenExpiration = undefined;

    await _user.save(); // Save user

    // Return success
    return res.status(201).json({
      success: true,
      data: "Password reset success",
    });
  } catch (err) {
    // Error
    console.log(err);
    next(err);
  }
};

// Controller Functions
const sendToken = (_user, statusCode, res) => {
  const token = _user.getSignedToken();
  const user = {
    _id: _user._id,
    email: _user.email,
    role: _user.role,
    firstName: _user.firstName,
    lastName: _user.lastName,
    contactNumber: _user.contactNumber,
  };
  res.cookie("token", token, { expiresIn: "10d" });
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};
