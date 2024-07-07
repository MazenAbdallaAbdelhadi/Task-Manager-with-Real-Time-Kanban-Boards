const User = require("../models/user.model");
const {
  generateAccessToken,
  generateOTP,
  encodeOTP,
} = require("../services/auth");
const {
  unAuthorized,
  badRequest,
  recordNotFound,
} = require("../utils/response");
const sendEmail = require("../services/email");

/**
 * @desc register new user
 * @path POST api/v1/auth/register
 * @access public
 */
exports.register = async (req, res) => {
  // 1- create a new user
  const user = await User.create(req.body);

  // 2- create access and refresh tokens for new user
  const accessToken = generateAccessToken({ userId: user._id });

  // 5- send access token to user
  res.success({ data: { token: accessToken, user } });
};

/**
 * @desc login user
 * @path POST api/v1/auth/login
 * @access public
 */
exports.login = async (req, res, next) => {
  // 1- check if user's email exists and password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(unAuthorized({ message: "incorrect email or password" }));
  }

  // 2- generate new access token for the user
  const accessToken = generateAccessToken({ userId: user._id });

  // 3- send access token to user
  res.success({ data: { token: accessToken, user } });
};

/**
 * @desc forgot password
 * @path POST api/v1/auth/forget-password
 * @access public
 */
exports.forgetPassword = async (req, res, next) => {
  // 1- check if user exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(recordNotFound());
  }

  // 2- generate otp and expireTime (20 min)
  const { otp: resetCode, otpHash: resetCodeHash } = generateOTP();
  const expireTime = Date.now() + 20 * 60 * 1000;

  // 3- set reset code hash in database
  user.passwordResetSecret = resetCodeHash;
  user.passwordResetExpires = expireTime;
  user.passwordResetVerified = false;

  await user.save();

  // 4- send email to user with reset code
  const mailOptions = {
    to: req.body.email,
    subject: "OTP forgot password",
    template: "/views/OTP.ejs",
    data: {
      username: user.name,
      otp: resetCode,
      expire: 20,
    },
  };
  await sendEmail(mailOptions);

  // 5- send response to user
  res.success({ message: "Check your email For ResetCode" });
};

/**
 * @desc confirm OTP
 * @path POST api/v1/auth/confirm-reset
 * @access public
 */
exports.confirmOTP = async (req, res, next) => {
  // 1- creat hash for reset code
  const resetCodeHash = encodeOTP(req.body.resetCode);

  // 2- find user with hashed reset code and update reset secret to undefined and reset verified to true
  const user = await User.findOneAndUpdate(
    {
      passwordResetSecret: resetCodeHash,
      passwordResetExpires: { $gt: Date.now() },
    },
    {
      passwordResetVerified: true,
    }
  );

  // 3- check if user exists
  if (!user) {
    return next(badRequest());
  }

  // 4- send response to user
  res.success();
};

/**
 * @desc reset password
 * @path POST api/v1/auth/reset-password
 * @access public
 */
exports.resetPassword = async (req, res, next) => {
  // 1- find user by email
  const user = await User.findOne({ email: req.body.email });

  // 2- check if user exist
  if (!user) {
    return next(recordNotFound());
  }

  // 3- check if password reset expires
  if (user.passwordResetExpires.getTime() < Date.now()) {
    return next(badRequest({ message: "reset password expired" }));
  }

  // 4- check if reset code is verified
  if (!user.passwordResetVerified) {
    return next(badRequest({ message: "reset code is not verified" }));
  }

  // 5- reset user password
  user.password = req.body.password;
  user.passwordChangedAt = Date.now();
  user.passwordResetVerified = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetSecret = undefined;

  await user.save();

  // 6- send response to user
  res.success({ message: "Password reset successfully. please login again." });
};
