const mongoose = require("mongoose");

const jrMod = mongoose.Schema({
  memberID: String,
  dateAdded: Date,
});
module.exports = mongoose.model("jrMod", jrMod);
