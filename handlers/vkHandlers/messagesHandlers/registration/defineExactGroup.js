var cheerio = require("cheerio");
var rp = require("request-promise");
var createKeyboard = require("../createKeyboard");
var { baseURL } = require("../../../../config/dbConfig");

var options = {
  uri: baseURL,
  transform: body => cheerio.load(body)
};

module.exports = async group => {
  const $ = await rp(options);
  var groups = [];
  $(".col-group a").each((i, el) => {
    groups.push($(el).text());
  });
  groups = groups.filter(gr => gr.indexOf(group) >= 0 && gr.indexOf("и") < 0);
  console.log("GROUPS: ", groups);
  var msg = "Вот какие группы мне удалось найти. Выбери среди них свою.";
  var keyboard = createKeyboard(groups, 2, "groupName");
  return [msg, keyboard, null];
};
