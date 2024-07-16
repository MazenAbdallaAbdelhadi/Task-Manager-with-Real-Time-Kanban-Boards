const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const responseHandler = require("./middleware/responseHandler");
const { routeNotFound } = require("./utils/response");
const createFolderIfNotExists = require("./utils/helper/create-folder-if-not-exist");

// HANDLE ASYNC ERRORS
require("express-async-errors");

// INITIALIZE APP
const app = express();

// LOGGER
app.use(logger("dev"));
if (process.env.NODE_ENV !== "production") {
  createFolderIfNotExists(path.join(__dirname, "..", "logs"));

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", "logs/access.log"),
    { flags: "a" }
  );
  app.use(logger("combined", { stream: accessLogStream }));
}

// GLOBAL MIDDLEWARE
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(responseHandler);

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "..", "public")));

// ROUTES
app.use(require("./routes"));

// NOT FOUND ROUTES
app.all("*", (_req, _res, next) => {
  return next(routeNotFound());
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
