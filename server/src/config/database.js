const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI);

mongoose.connection.on("open", function () {
  console.log(`[DATABASE] connection established`);
});

module.exports = mongoose;
