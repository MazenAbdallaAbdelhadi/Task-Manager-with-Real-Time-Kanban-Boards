const { success } = require("../utils/response");

const responseHandler = (req, res, next) => {
  res.success = (data = {}) => {
    const { body, statusCode } = success(data);
    res.status(statusCode).json(body);
  };

  return next();
};

module.exports = responseHandler;
