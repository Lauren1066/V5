const mongoose = require("mongoose");

const codes = mongoose.Schema({
  memberID: String,
  code: String,
});
module.exports = mongoose.model("codes", codes);
