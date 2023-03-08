const mongoose = require("mongoose");

const reviews = mongoose.Schema({
  totalStars: Number,
  totalReviews: Number,
  memberID: String,
});
module.exports = mongoose.model("reviews", reviews);
