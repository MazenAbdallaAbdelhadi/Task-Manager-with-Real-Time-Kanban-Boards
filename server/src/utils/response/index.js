const responseCode = require("./responseCode");
const responseStatus = require("./responseStatus");

module.exports = {
  success: (data = {}) => ({
    statusCode: responseCode.success,
    body: {
      status: responseStatus.success,
      message: data.message || "Your request is successfully executed.",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  failure: (data = {}) => ({
    statusCode: responseCode.success,
    body: {
      status: responseStatus.failure,
      message: data.message || "Some error occurred while performing action.",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  internalServerError: (data = {}) => ({
    statusCode: responseCode.internalServerError,
    body: {
      status: responseStatus.serverError,
      message: data.message || "Internal server error.",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  badRequest: (data = {}) => ({
    statusCode: responseCode.badRequest,
    body: {
      status: responseStatus.badRequest,
      message: data.message || "Request parameters are invalid or missing.",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  recordNotFound: (data = {}) => ({
    statusCode: responseCode.badRequest,
    body: {
      status: responseStatus.recordNotFound,
      message: data.message || "Record(s) not found with specified criteria.",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  routeNotFound: (data = {}) => ({
    statusCode: responseCode.notFound,
    body: {
      status: responseStatus.badRequest,
      message: data.message || "Route not found",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  validationError: (data = {}) => ({
    statusCode: responseCode.validationError,
    body: {
      status: responseStatus.validationError,
      message: data.message || `Invalid Data, Validation Failed.`,
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),

  unAuthorized: (data = {}) => ({
    statusCode: responseCode.unAuthorized,
    body: {
      status: responseStatus.unauthorized,
      message: data.message || "You are not authorized to access the request",
      data: data.data && Object.keys(data.data).length ? data.data : null,
    },
  }),
};
