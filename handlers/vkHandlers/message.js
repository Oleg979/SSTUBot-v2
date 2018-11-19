var defineGroup = require("./messagesHandlers/registration/defineGroup");
var defineExactGroup = require("./messagesHandlers/registration/defineExactGroup");
var createKeyboard = require("./messagesHandlers/createKeyboard");
var User = require("../dbHandlers/userSchema");
var cheerio = require("cheerio");
var rp = require("request-promise");
var handleText = require("./messagesHandlers/handleText");
var defineInstitute = require("./messagesHandlers/registration/defineInstitute");
var schedule = require("./messagesHandlers/actions/today");
var now = require("./messagesHandlers/actions/now");
var next = require("./messagesHandlers/actions/next");
var tomorrow = require("./messagesHandlers/actions/tomorrow");
var subscribe = require("./messagesHandlers/actions/subscribe");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ from_id, text, payload }) => {
  if (payload == undefined || !payload) {
    return await handleText(from_id, text);
  }

  payload = JSON.parse(payload);

  if ("institute" in payload) {
    const count = await User.countDocuments({ from_id });
    if (count > 0)
      await User.findOneAndUpdate(
        { id: from_id },
        { $set: { institute: payload.institute } }
      ).exec();
    else {
      var user = new User({
        id: from_id,
        institute: payload.institute
      });
      user = await user.save();
    }
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
          "Что дальше",
          "Сменить группу",
          "Отписаться/подписаться на утреннюю рассылку"
        ],
        1,
        "action"
      ),
      null
    ];
  }

  if ("action" in payload) {
    switch (payload.action) {
      case "Расписание на сегодня":
        return await schedule(from_id);
      case "Расписание на завтра":
        return await tomorrow(from_id);
      case "Что сейчас":
        return await now(from_id);
      case "Что дальше":
        return await next(from_id);
      case "Сменить группу":
        await User.findOneAndRemove({ id: from_id }).exec();
        return await defineInstitute(from_id);
      case "Отписаться/подписаться на утреннюю рассылку":
        return await subscribe(from_id);
      default:
        return ["Спасибо!", null, null];
    }
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// return ["Спасибо!", { buttons: [], one_time: true }, null];
