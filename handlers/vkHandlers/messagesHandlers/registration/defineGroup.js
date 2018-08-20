var createKeyboard = require("../createKeyboard");

module.exports = institute => {
  console.log(institute);
  const msg = `Отлично, теперь давай определим твоё направление. Выбери его из предложенных ниже.`;
  switch (institute) {
    case "ИНПИТ":
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
    case "ИНЭТМ":
      arr = [
        "АТПП",
        "ИКТС",
        "КТОП",
        "ЛАЗР",
        "МАИС",
        "МЕТЛ",
        "МНСТ",
        "МХРТ",
        "ПБРС",
        "РТХН",
        "ТМОБ"
      ];
      break;
    case "ИНЭТС":
      arr = [
        "СТЗС",
        "ТПЭН",
        "ТТПР",
        "ЭЛЭТ",
        "ЭТТК",
        "АЭС",
        "НТС",
        "СМТ",
        "СЗС"
      ];
      break;
    case "УРБАС":
      arr = ["АРХТ", "ДАРС", "ЗМКД", "НФГД", "СТЗС", "ЭКЛП", "СЗС", "ГРАД"];
      break;
    case "ИСПМ":
      arr = [
        "ЖХКИ",
        "ПСХЛ",
        "МЕНЖ",
        "ТОРГ",
        "ЭКОН",
        "ДОКМ",
        "ТЖД",
        "ЭБЗ",
        "ТУРМ",
        "ФНКР"
      ];
      break;
    case "ФТИ":
      arr = ["МВТМ", "БИСТ", "ПМИН", "САУП", "ТХНБ", "ТХФИ", "ХМТН", "ЭРСП"];
      break;
    default:
      arr = null;
  }
  const keyboard = createKeyboard(arr, 4, "group");
  console.log(keyboard);
  return [msg, keyboard, null];
};
