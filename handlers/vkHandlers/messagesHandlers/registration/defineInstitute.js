var { getUserDataById } = require("../../others/userData");
var createKeyboard = require("../createKeyboard");
module.exports = async id => {
  const { first_name } = await getUserDataById(id);
  const msg = `Добро пожаловать, ${first_name}! Прежде всего мне нужно определить, в какой группе ты учишься. Для начала напиши название своего института.`;
  const keyboard = createKeyboard(
    ["ИНПИТ", "ИНЭТМ", "ИНЭТС", "ИСПМ", "ФТИ", "УРБАС"],
    2,
    "institute"
  );
  return [msg, keyboard, null];
};
