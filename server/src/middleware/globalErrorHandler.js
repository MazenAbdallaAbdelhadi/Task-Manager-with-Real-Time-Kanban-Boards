const globalErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, body = err } = err;

  res.status(statusCode).json(body);
};

module.exports = globalErrorHandler;
