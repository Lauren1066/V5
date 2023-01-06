const mongoose = require("mongoose");

const parents = mongoose.Schema({
  children: [{ childID: String, accepted: Boolean }],
  parentID: String,
});
module.exports = mongoose.model("parents", parents);
