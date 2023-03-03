const mongoose = require("mongoose");

const averages = mongoose.Schema({
  weeklyMessages: [Number],
  memberID: String,
});
module.exports = mongoose.model("averages", averages);
