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
    .children()
    .find(".rasp-table-inner-cell")
    .each((i, el) => {
      if (
        $(el)
          .children()
          .find(".small").length < 1
      ) {
        res.push(`${i + 1}. -`);
        return;
      }

      var children = $(el).children();
      var aud = children.find(".aud").text();
      var subject = children.find(".subject").text();
      var type = children.find(".type").text();
      var teacher = children.find(".teacher").text();
      res.push(
        `${i + 1}. ${subject} ${type} в ${aud} ауд. у преподавателя ${teacher}`
      );
    });

  console.log(cols);
  return [res.join("\n"), null, null];
};
