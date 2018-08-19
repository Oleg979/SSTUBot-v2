var defineInstitute = require("./messagesHandlers/registration/defineInstitute");
var defineGroup = require("./messagesHandlers/registration/defineGroup");
var defineExactGroup = require("./messagesHandlers/registration/defineExactGroup");
var createKeyboard = require("./messagesHandlers/createKeyboard");
var User = require("../dbHandlers/userSchema");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ from_id, text, payload }) => {
  if (payload == undefined || !payload) payload = { command: "start" };
  else payload = JSON.parse(payload);

  if ("command" in payload) {
    const arr = await defineInstitute(from_id);
    return arr;
  }

  if ("institute" in payload) {
    var user = new User({
      id: from_id,
      institute: payload.institute
    });
    user = await user.save();
    return defineGroup(payload.institute);
  }

  if ("group" in payload) {
    await User.findOneAndUpdate(
      { id: from_id },
      { $set: { groupName: payload.group } }
    ).exec();
    return defineExactGroup(payload.group);
  }

  if ("groupName" in payload) {
    await User.findOneAndUpdate(
      { id: from_id },
      { $set: { group: payload.groupName } }
    ).exec();
    return [
      "Твоя регистрация прошла успешно! Теперь ты можешь пользоваться всеми моими функциями.",
      createKeyboard(
        ["Расписание на сегодня", "Расписание на завтра"],
        2,
        "action"
      ),
      null
    ];
  }

  if ("action" in payload) {
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// return ["Спасибо!", { buttons: [], one_time: true }, null];
