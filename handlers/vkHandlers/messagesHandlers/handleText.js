var User = require("../dbHandlers/userSchema");
var defineInstitute = require("./messagesHandlers/registration/defineInstitute");

module.exports = async (id, text) => {
  const count = await User.countDocuments({ id: from_id });
  if (count > 0)
    return [
      "Для общения со мной используй кнопки меню. Чтобы отобразить меню, нажми на значок справа от поля ввода.",
      null,
      null
    ];
  return await defineInstitute(from_id);
};
