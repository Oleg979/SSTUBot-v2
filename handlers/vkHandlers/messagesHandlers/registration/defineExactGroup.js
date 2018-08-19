var cheerio = require("cheerio");
var rp = require("request-promise");
var createKeyboard = require("../createKeyboard");

var options = {
  uri: "http://rasp.sstu.ru",
  transform: body => cheerio.load(body)
};

module.exports = async group => {
  const $ = await rp(options);
  const groups = $(".col-group a")
    .filter((i, el) => {
      return (
        $(el)
          .text()
          .indexOf(group) >= 0
      );
    })
    .map((i, el) => $(el).text());
  console.log(groups);
  var keyboard = createKeyboard(groups, 4, "groupName");
  var msg = "Вот какие группы мне удалось найти. Выбери среди них свою.";
  return [msg, keyboard, null];
};
