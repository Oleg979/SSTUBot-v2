var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  institute: String,
  groupName: String,
  group: String,
  isSubscribed: Boolean
});

var User = mongoose.model("User", userSchema);

module.exports = User;
