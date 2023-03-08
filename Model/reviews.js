const mongoose = require("mongoose");

const reviews = mongoose.Schema({
  totalStars: Number,
  totalReviews: Number,
});
module.exports = mongoose.model("reviews", reviews);
