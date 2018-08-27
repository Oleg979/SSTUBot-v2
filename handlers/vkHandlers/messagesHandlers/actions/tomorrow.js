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
    if ($(el).hasClass("today")) num = i;
  });

  num = 0;

  $(".rasp-table-col")
    .eq(num + 1)
    .children()
    .find(".rasp-table-row   .rasp-table-inner-cell")
    .each((i, el) => {
      var children = $(el).children();
      var aud = children.find(".aud").text();
      if (aud == "") {
        res.push(`${i + 1}. -`);
        return;
      }
      pairs++;
      var subject = children.find(".subject").text();
      var type = children.find(".type").text();
      var teacher = children.find(".teacher").text();

      var subjectm = children.find(".subject-m").text();
      if (subjectm != "") {
        res.push(`${i + 1}.${subjectm}`);
      } else
        res.push(
          `${i +
            1}. ${subject} ${type} в ${aud} ауд. у преподавателя ${teacher}`
        );
    });

  return [
    pairs > 0
      ? `Завтра у тебя ${pairs} пар${
          pairs > 4 ? "" : pairs > 1 ? "ы" : "а"
        }:\n${res.join("\n")}`
      : "Завтра у тебя нет пар, можешь отдыхать!",
    null,
    null
  ];
};
