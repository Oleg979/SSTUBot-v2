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
    .map((i, el) =>
      $(el)
        .text()
        .get()
    )
    .filter((i, el) => {
      return $(el).indexOf(group) >= 0;
    });
  console.log("GROUPS: ", groups);
  //var keyboard = createKeyboard(groups, 4, "groupName");
  var msg = "Вот какие группы мне удалось найти. Выбери среди них свою.";
  return [msg, { buttons: [], one_time: true }, null];
};
