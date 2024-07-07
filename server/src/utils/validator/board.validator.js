const { body, param, checkExact } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { isValidObjectId } = require("mongoose");

exports.createBoardValidator = [
  body("title").notEmpty().withMessage("Board title is required").trim(),
  body("description").optional().trim(),
  checkExact(),
  validatorMiddleware,
];

exports.updateBoardValidator = [
  param("id").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid boardId");
    }
    return true;
  }),
  body("title").optional().trim(),
  body("description").optional().trim(),
  checkExact(),
  validatorMiddleware,
];

exports.deleteBoardValidator = [
  param("id").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid boardId");
    }
    return true;
  }),
  checkExact(),
  validatorMiddleware,
];

exports.addColumnToBoardValidator = [
  param("id").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid boardId");
    }
    return true;
  }),
  body("name").notEmpty().withMessage("Column name is required").trim(),
  checkExact(),
  validatorMiddleware,
];

exports.updateColumnNameValidator = [
  param("id").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid boardId");
    }
    return true;
  }),
  body("columnId").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid columnId");
    }
    return true;
  }),
  body("newName").notEmpty().withMessage("Column new name is required").trim(),
  checkExact(),
  validatorMiddleware,
];

exports.swapColumnsValidator = [
  param("id").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid boardId");
    }
    return true;
  }),
  body("columnId1").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid columnId1");
    }
    return true;
  }),
  body("columnId2").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid columnId2");
    }
    return true;
  }),
  checkExact(),
  validatorMiddleware,
];

exports.removeColumnFromBoardValidator = [
  param("id").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid boardId");
    }
    return true;
  }),
  body("columnId").custom((val) => {
    if (!isValidObjectId(val)) {
      throw new Error("Invalid columnId");
    }
    return true;
  }),
  checkExact(),
  validatorMiddleware,
];
