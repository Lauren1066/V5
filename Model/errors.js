const mongoose = require("mongoose");

const modelErrors = mongoose.Schema({
  errorArray: [String],
});
module.exports = mongoose.model("modelErrors", modelErrors);
