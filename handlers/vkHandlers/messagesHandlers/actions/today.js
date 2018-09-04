/* var todaySchedule = require("./schedule");

module.exports = async id => {
  var [res, num] = await todaySchedule(id);
  if (num == -1) return [res, null, null];
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
 */

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
  var num = 0;

  var row = $(".today ");
  if (row.length < 1) return ["Сегодня у вас нет пар", null, null];
  else return [row.length, null, null];

  /*  row.each((i, el) => {
    $(el)
      .children()
      .find(".rasp-table-inner-cell")
      .each((idx, e) => {
        var children = $(e).children();
        var aud = children.find(".aud").text();
        if (aud == "") {
          res.push(`${i + 1}. -`);
          return;
        }
        var subject = children.find(".subject").text();
        var type = children.find(".type").text();
        var teacher = children.find(".teacher").text();
        num++;

        var subjectm = children.find(".subject-m").text();
        if (subjectm != "") {
          var sub = children.find(".subgroup");
          res.push(
            `${i + 1}. ${subjectm} ${sub.eq(0).text()} ${sub.eq(1).text()}`
          );
        } else
          res.push(
            `${i +
              1}. ${subject} ${type} в ${aud} ауд. у преподавателя ${teacher}`
          );
      });
  });

  return [res, num]; */
};
