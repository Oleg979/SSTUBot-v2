var { dbOffset } = require("../../../../config/dbConfig");
var schedule = require("./schedule");
module.exports = async id => {
  var [res, num] = await schedule(id);

  var date = new Date();
  //var hours = date.getHours() + dbOffset;
  //var minutes = date.getMinutes();

  var hours = 10;
  var minutes = 10;

  var num = 0;
  var text;

  if (hours < 8) {
    text = `Пары ещё не начались. До первой пары ${60 - minutes} минут`;
  } else
    switch (hours) {
      case 8:
        num = 1;
        text = "Сейчас первая пара.";
        break;

      case 9:
        if (minutes <= 30) {
          num = 1;
          text = `Она закончится через ${30 - minutes} минут.`;
        } else if (minutes > 30 && minutes <= 45)
          text = `Сейчас перемена между 1 и 2 парой. До её конца ${45 -
            minutes} минут`;
        else {
          num = 2;
          text = "Сейчас вторая пара";
        }
        break;

      case 10:
        num = 2;
        text = "Сейчас вторая пара.";
        break;

      case 11:
        if (minutes <= 15) {
          num = 2;
          text = "Сейчас вторая пара.";
        } else if (minutes > 15 && minutes <= 30)
          text = `Сейчас перемена между 2 и 3 парой. Она закончится через ${30 -
            minutes} минут`;
        else {
          num = 3;
          text = "Сейчас третья пара";
        }
        break;

      case 12:
        num = 3;
        text = "Сейчас третья пара.";
        break;

      case 13:
        if (minutes > 40) {
          num = 4;
          text = "Сейчас четвертая пара";
        } else
          text = `Сейчас большая перемена. Она закончится через ${40 -
            minutes} минут`;
        break;

      case 14:
        num = 4;
        break;

      case 15:
        if (minutes > 10) text = "Пары уже закончились.";
        else {
          num = 4;
          text = `До конца осталось ${10 - minutes} минут.`;
        }
        break;

      case 16:
        num = 5;
        break;
    }

  var lesson =
    num > 0
      ? res[num - 1].length > 10
        ? `Сейчас идёт пара №${res[num - 1]}\n${text}`
        : "Сейчас у тебя нет никакой пары."
      : text;

  return [lesson, null, null];
};
