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
  var num = 1;
  var amount = 0;

  var row = $(".today ");
  if (row.length < 1) return ["Сегодня у вас нет пар", null, null];
  row.each((i, el) => {
    if ($(el).hasClass("rasp-table-row ")) {
      var children = $(el).find(".rasp-table-inner-cell");
      var aud = children.find(".aud").text();
      if (aud == "") {
        res.push(`${num}. -`);
        num++;
        return;
      }
      var subject = children.find(".subject").text();
      var type = children.find(".type").text();
      var teacher = children.find(".teacher").text();

      var subjectm = children.find(".subject-m").text();
      if (subjectm != "") {
        var sub = children.find(".subgroup");
        res.push(`${num}. ${subjectm} ${sub.eq(0).text()} ${sub.eq(1).text()}`);
      } else
        res.push(
          `${num}. ${subject} ${type} в ${aud} ауд. у преподавателя ${teacher}`
        );
      num++;
      amount++;
    }
  });
  return [res, amount];
};
