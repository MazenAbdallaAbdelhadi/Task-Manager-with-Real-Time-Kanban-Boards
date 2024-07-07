require("dotenv/config");

const app = require("./app");

// CONNECT TO DATABASE
const mongoose = require("./config/database");

// RUN SERVER
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`[SERVER] listening on ${PORT}`);
});

// INITIALIZE SOCKET
require("./socket")(server);

// HANDLE MONGOOSE ERROR
mongoose.connection.on("error", function (err) {
  console.error(`[DATABASE] connection error `, err);
  server.close(() => {
    console.log(`[SERVER] closing server`);
    process.exit(1);
  });
});

// HANDLE UNCAUGHT EXEPTION
process.on("uncaughtException", function (err, origin) {
  console.error(`[ERROR] error: ${err}`, origin);
  server.close(() => {
    console.log(`[SERVER] closing server`);
    process.exit(1);
  });
});

// HANDLE UNHANDLED REJECTIONS
process.on("unhandledRejection", function (reason, promise) {
  console.error(`[ERROR] reason: `, reason, " at promise: ", promise);
  server.close(() => {
    console.log(`[SERVER] closing server`);
    process.exit(1);
  });
});
