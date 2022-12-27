const mongoose = require("mongoose");

const helperRoles = mongoose.Schema({
  roleID: String,
  roleName: String,
});
module.exports = mongoose.model("helperRoles", helperRoles);
