var createKeyboard = require("../createKeyboard");

module.exports = institute => {
  const msg = `Отлично, теперь давай определим твоё направление. Выбери его из предложенных ниже.`;
  const keyboard = createKeyboard(
    [
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
    ],
    4,
    "group"
  );
  return [msg, keyboard, null];
};
