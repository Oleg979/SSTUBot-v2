var cheerio = require("cheerio");
var rp = require("request-promise");
var User = require("../../../dbHandlers/userSchema");
var { baseURL } = require("../../../../config/dbConfig");

module.exports = async id => {
  var user = await User.findOne({ id });
  var group = user.group;
  var options = {
    uri: `${baseURL}${group}`,
    transform: body => cheerio.load(body)
  };
  const $ = await rp(options);

  var res = [];
  var num = -1;
  var pairs = 0;
  $(".rasp-table-col").each((i, el) => {
    if ($(el).find(".today ").length != 0) {
      num = i;
    }
  });
};
/* num = $(".rasp-table-col")
  .eq(num)
  .find(".rasp-table-row ").length; */
return [num, null, null];
