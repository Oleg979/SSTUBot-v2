var User = require("../../../dbHandlers/userSchema");

module.exports = async id => {
  var user = await User.findOne({ id });
  var isSubscribed = user.isSubscribed;
  await User.findOneAndUpdate(
    { id },
    { $set: { isSubscribed: !isSubscribed } }
  ).exec();
  return [isSubscribed ? "Unsub" : "Sub", null, null];
};
