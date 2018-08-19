var defineGroup = require("./messagesHandlers/registration/defineGroup");
var defineExactGroup = require("./messagesHandlers/registration/defineExactGroup");
var createKeyboard = require("./messagesHandlers/createKeyboard");
var User = require("../dbHandlers/userSchema");
var cheerio = require("cheerio");
var rp = require("request-promise");
var handleText = require("./messagesHandlers/handleText");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ from_id, text, payload }) => {
  if (payload == undefined || !payload) {
    return await handleText(from_id, text);
  }

  payload = JSON.parse(payload);

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
    var options = {
      uri: "http://rasp.sstu.ru",
      transform: body => cheerio.load(body)
    };

    const $ = await rp(options);
    var groups = $(".col-group a").filter((i, el) => {
      return $(el).text() == payload.groupName;
    });

    console.log(groups);

    await User.findOneAndUpdate(
      { id: from_id },
      { $set: { group: groups.attr("href") } }
    ).exec();
    return [
      "Твоя регистрация прошла успешно! Теперь ты можешь пользоваться всеми моими функциями.",
      createKeyboard(
        [
          "Расписание на сегодня",
          "Расписание на завтра",
          "Что сейчас",
          "Что дальше"
        ],
        1,
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
