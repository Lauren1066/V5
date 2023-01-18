const mongoose = require("mongoose");

const meme = mongoose.Schema({
  guildID: String,
  lastUsed: Number,
});
module.exports = mongoose.model("meme", meme);
