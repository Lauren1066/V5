const mongoose = require("mongoose");

const marriages = mongoose.Schema({
  users: [{ userOne: String, userTwo: String }],
  proposedAt: Date,
  accepted: Boolean,
});
module.exports = mongoose.model("marriages", marriages);
