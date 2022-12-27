const mongoose = require("mongoose");

const event = mongoose.Schema({
  guildID: String,
  lastUsed: Number,
});
module.exports = mongoose.model("event", event);
