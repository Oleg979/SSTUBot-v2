var createKeyboard = require("../createKeyboard");

module.exports = institute => {
  const msg = `Отлично, теперь давай определим твоё направление. Выбери его из предложенных ниже.`;
  switch (institute) {
    case 1:
      arr = [
        "ИФСТ",
        "ПИНФ",
        "ПИНЖ",
        "ИВЧТ",
        "ИФБС",
        "ИБС",
        "КИЛП",
        "ДИЗН",
        "РКЛМ",
        "ТЛВД"
      ];
      break;
    case 2:
      arr = [];
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    default:
      arr = [];
  }
  const keyboard = createKeyboard(arr, 4, "group");
  return [msg, keyboard, null];
};
