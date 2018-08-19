var defineInstitute = require("./messagesHandlers/registration/defineInstitute");
var defineGroup = require("./messagesHandlers/registration/defineGroup");
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
    console.log("user created: ", user);
    return defineGroup(payload.institute);
  }

  if ("group" in payload) {
    return ["Спасибо!", { buttons: [], one_time: true }, null];
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// return ["Спасибо!", { buttons: [], one_time: true }, null];
