const mongoose = require("mongoose");

const applications = mongoose.Schema({
  questions: [String],
  answers: [String],
  memberID: String,
});
module.exports = mongoose.model("applications", applications);
