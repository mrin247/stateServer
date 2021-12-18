const express = require("express");
const { storeSignup, storeSignin, storeForgotPassword, storeResetPassword } = require("../../controllers/store/auth");
const router = express.Router();

router.post('/store/signup', storeSignup);
router.post('/store/signin', storeSignin);
router.post('/store/forgot-password', storeForgotPassword);
router.post('/store/reset-password', storeResetPassword);


module.exports = router;
