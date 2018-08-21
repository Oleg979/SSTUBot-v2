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
  var num = 0;
  var cols = $(".rasp-table-col")
    .first()
    .children()
    .find(".rasp-table-row   .rasp-table-inner-cell")
    .each((i, el) => {
      var children = $(el).children();
      var aud = children.find(".aud").text();
      if (aud == "") {
        res.push(`${i + 1}. -`);
        return;
      }
      var subject = children.find(".subject").text();
      var type = children.find(".type").text();
      var teacher = children.find(".teacher").text();
      num++;
      res.push(
        `${i + 1}. ${subject} ${type} в ${aud} ауд. у преподавателя ${teacher}`
      );
    });

  return [
    num > 0
      ? `Сегодня у тебя ${num} пар${
          num > 4 ? "" : num > 1 ? "ы" : "а"
        }:\n${res.join("\n")}`
      : "Сегодня у тебя нет пар, можешь отдыхать!",
    null,
    null
  ];
};
