var { getUserDataById } = require("../../others/userData");
var createKeyboard = require("../createKeyboard");
module.exports = async id => {
  const { first_name } = await getUserDataById(id);
  const msg = `Добро пожаловать, ${first_name}! Прежде всего мне нужно определить, в какой группе ты учишься. Для начала выбери название своего института.`;
  const keyboard = createKeyboard(
    ["ИНПИТ", "ИНЭТМ", "ИНЭТС", "УРБАС", "ИСПМ", "ФТИ"],
    2,
    "institute"
  );
  console.log(JSON.stringify(keyboard));
  return [msg, keyboard, null];
};
