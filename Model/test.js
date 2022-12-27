const mongoose = require("mongoose");

const test = mongoose.Schema({
  memberID: String,
  repAmount: {
    default: 0,
    type: Number,
  },
});
module.exports = mongoose.model("test", test);
