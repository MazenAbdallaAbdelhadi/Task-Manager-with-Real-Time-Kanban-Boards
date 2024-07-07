const { Router } = require("express");
const {
  register,
  login,
  forgetPassword,
  confirmOTP,
  resetPassword,
} = require("../controllers/auth.controller");
const {
  uploadProfileImage,
  resizeProfileImage,
} = require("../controllers/user.controller");
const {
  registerValidator,
  loginValidator,
  forgetPasswordValidator,
  confirmOTPValidator,
  resetPasswordValidator,
} = require("../utils/validator/auth.validator");

const router = Router();

router.post(
  "/register",
  uploadProfileImage,
  resizeProfileImage,
  registerValidator,
  register
);
router.post("/login", loginValidator, login);
router.post("/forget-password", forgetPasswordValidator, forgetPassword);
router.post("/confirm-reset", confirmOTPValidator, confirmOTP);
router.post("/reset-password", resetPasswordValidator, resetPassword);

module.exports = router;
