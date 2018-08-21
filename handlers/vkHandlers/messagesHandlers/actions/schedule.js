var cheerio = require("cheerio");
var rp = require("request-promise");
var User = require("../../../dbHandlers/userSchema");

module.exports = async id => {
  var user = await User.findOne({ id });
  var group = user.group;
  var options = {
    uri: `http://rasp.sstu.ru${group}`,
    transform: body => cheerio.load(body)
  };
  const $ = await rp(options);
  var res = [];
  var cols = $(".rasp-table-col")
    .first()
    .children(".rasp-table-inner-cell .small")
    .map(function(i, el) {
      // this === el
      return $(this).text();
    })
    .get()
    .join("\n");
  return [cols, null, null];
};
