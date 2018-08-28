var { dbOffset } = require("../../../../config/dbConfig");
var schedule = require("./schedule");
module.exports = async id => {
  var [res, num] = await schedule(id);

  var date = new Date();
  var hours = date.getHours() + dbOffset;
  var minutes = date.getMinutes();

  hours = 11;
  minutes = 10;

  var num = 0;
  var text;

  if (hours < 8) {
    num = -1;
    text = `Она начнётся через ${60 - minutes} минут.`;
  } else
    switch (hours) {
      case 8:
        num = 1;
        text = `Она начнётся через ${60 - minutes + 30 + 15} минут.`;
        break;

      case 9:
        num = 1;
        if (minutes <= 30)
          text = `Она начнётся через ${30 - minutes + 15} минут.`;
        else if (minutes > 30 && minutes <= 45)
          text = `Она начнётся через ${45 - minutes} минут.`;
        else {
          num = 2;
          text = `Она начнётся через 1 час и ${60 - minutes + 15 + 15} минут.`;
        }
        break;

      case 10:
        num = 2;
        text = `Она начнётся через ${60 - minutes + 15 + 15} минут.`;
        break;

      case 11:
        if (minutes <= 15) {
          num = 2;
          text = `Она начнётся через ${15 - minutes + 15} минут.`;
        } else if (minutes > 15 && minutes <= 30) {
          num = 2;
          text = `Она начнётся через ${30 - minutes} минут.`;
        } else {
          num = 3;
          text = `Она начнётся через 1 час и ${60 - minutes + 40} минут.`;
        }
        break;

      case 12:
        num = 3;
        text = `Она начнётся через ${60 - minutes + 40} минут.`;
        break;

      case 13:
        num = 4;
        if (minutes > 40) {
          text = `Она начнётся через 1 час и ${10 + 60 - minutes + 15} минут.`;
        } else text = `Она начнётся через ${40 - minutes} минут.`;
        break;

      case 14:
        num = 4;
        text = `Она закончится через ${10 + 60 - minutes} минут.`;
        break;

      case 15:
        if (minutes > 10) text = "Пары уже закончились.";
        else {
          num = 4;
          text = `Она начнётся через ${10 - minutes + 15} минут.`;
        }
        break;

      default:
        text = "Пары уже закончились.";
        break;
    }

  var lesson =
    num > 0
      ? res[num].length > 10
        ? `Дальше будет пара №${res[num]}.\n${text}`
        : "Дальше у тебя нет никакой пары."
      : text;

  return [lesson, null, null];
};
