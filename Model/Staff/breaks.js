const mongoose = require("mongoose");

const breaks = mongoose.Schema({
  memberID: String,
  duration: String,
  startedAt: Date,
});
module.exports = mongoose.model("breaks", breaks);
