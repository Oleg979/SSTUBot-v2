var cheerio = require("cheerio");
var rp = require("request-promise");
var User = require("../../../dbHandlers/userSchema");
var { baseURL, dbOffset } = require("../../../../config/dbConfig");

module.exports = async id => {
  var user = await User.findOne({ id });
  var group = user.group;
  var options = {
    uri: `${baseURL}${group}`,
    transform: body => cheerio.load(body)
  };
  const $ = await rp(options);
  var date = new Date();
  var hours = date.getHours() + dbOffset;
  var minutes = date.getMinutes();
  return [`${hours}:${minutes}`, null, null];
};
