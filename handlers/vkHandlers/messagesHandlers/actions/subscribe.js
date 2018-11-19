module.exports = async id => {
  var user = await User.findOne({ id });
  var isSubscribed = user.isSubscribed;
  return [isSubscribed ? "Unsub" : "Sub", null, null];
};
