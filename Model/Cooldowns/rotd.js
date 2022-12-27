const mongoose = require("mongoose");

const rotd = mongoose.Schema({
  guildID: String,
  lastUsed: Number,
});
module.exports = mongoose.model("rotd", rotd);
