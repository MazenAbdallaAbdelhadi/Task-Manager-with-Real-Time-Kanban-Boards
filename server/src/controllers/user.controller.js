const path = require("path");
const sharp = require("sharp");
const { v4: uuidV4 } = require("uuid");
const User = require("../models/user.model");
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../services/factory-handler");
const { generateAccessToken } = require("../services/auth");
const { uploadSingle } = require("../middleware/file-upload");
const createFolderIfNotExists = require("../utils/helper/create-folder-if-not-exist");

exports.uploadProfileImage = uploadSingle("profileImage");

exports.resizeProfileImage = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);

    const filename = `user-${uuidV4()}-${Date.now()}.jpeg`;

    createFolderIfNotExists(
      path.join(__dirname, "../../public/images/profiles")
    );

    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(path.join(__dirname, "../../public/images/profiles", filename));

    // Save image into our db
    req.body.profileImage = `http://localhost:${process.env.PORT}/images/profiles/${filename}`;
  }
  next();
};

/**
 * @desc create a new user
 * @path POST /v1/users
 * @access private ADMIN
 */
exports.createUser = createOne(User);

/**
 * @desc get users
 * @path GET /v1/users
 * @access private ADMIN
 */
exports.getUsers = getAll(User);

/**
 * @desc get user by id
 * @path GET /v1/users/:id
 * @access private ADMIN
 */
exports.getUser = getOne(User);

/**
 * @desc update user by id
 * @path PUT /v1/users/:id
 * @access private ADMIN
 */
exports.updateUser = updateOne(User);

/**
 * @desc update user password by id
 * @path PUT /v1/users/:id/changePassword
 * @access private ADMIN
 */
exports.updateUserPassword = async (req, res) => {
  // 1- get user from req object
  const user = await User.findById(req.params.id);

  // 2- update user password and save it to database
  user.password = req.body.newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  // 6- send access token to user
  res.success({ message: "user password updated" });
};

/**
 * @desc delete user by id
 * @path DELETE /v1/users/:id
 * @access private ADMIN
 */
exports.deleteUser = deleteOne(User);

/**
 * @desc get logged user profile
 * @path GET /v1/users/getMe
 * @access protected
 */
exports.getLoggedUser = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

/**
 * @desc update logged user profile
 * @path GET /v1/users/updateMe
 * @access protected
 */
exports.updateLoggedUser = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

/**
 * @desc update logged user password
 * @path GET /v1/users/updateMyPassword
 * @access protected
 */
exports.updateLoggedUserPassword = async (req, res) => {
  // 1- get user from req object
  const { user } = req;

  // 2- update user password and save it to database
  user.password = req.body.newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  // 3- generate new access token for user
  const accessToken = generateAccessToken({ userId: user._id });

  // 4- send access token to user
  res.success({ data: { token: accessToken } });
};

/**
 * @desc delete logged user profile
 * @path GET /v1/users/deleteMe
 * @access protected
 */
exports.deleteLoggedUser = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
