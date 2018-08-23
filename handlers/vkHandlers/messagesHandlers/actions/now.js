var cheerio = require("cheerio");
var rp = require("request-promise");
var User = require("../../../dbHandlers/userSchema");
var { baseURL, dbOffset } = require("../../../../config/dbConfig");

module.exports = async id => {
  var user = await User.findOne({ id });
  var group = user.group;
  var options = {
    uri: `${baseURL}${group}`,
    transform: body => cheerio.load(body)
  };
  const $ = await rp(options);

  var date = new Date();
  var hours = date.getHours() + dbOffset;
  var minutes = date.getMinutes();

  var text;

  if (hours < 8) {
    text = "Пары ещё не начались.";
  } else
    switch (hours) {
      case 8:
        text = "Сейчас первая пара.";
        break;
      case 9:
        if (minutes <= 30) text = "Сейчас первая пара";
        else if (minutes > 30 && minutes <= 45)
          text = "Сейчас перемена между 1 и 2 парой.";
        else text = "Сейчас вторая пара";
        break;
      case 10:
        text = "Сейчас вторая пара.";
        break;
      case 11:
        if (minutes <= 15) text = "Сейчас вторая пара.";
        else if (minutes > 15 && minutes <= 30)
          text = "Сейчас перемена между 2 и 3 парой.";
        else text = "Сейчас третья пара";
        break;
      case 12:
        text = "Сейчас третья пара.";
        break;
      case 13:
        if (minutes > 40) text = "Сейчас четвертая пара";
        else text = "Сейчас большая перемена.";
        break;
      case 14:
        text = "Сейчас четвертая пара";
        break;
      case 15:
        if (minutes > 10) text = "Пары уже закончились.";
        else text = "Сейчас четвертая пара";
        break;
    }

  return [text, null, null];
};
