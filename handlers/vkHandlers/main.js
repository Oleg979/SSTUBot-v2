var handleMessage = require("./message");
var { groupToken } = require("../../config/vkConfig");
var axios = require("axios");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ type, object }) => {
  console.log(object);
  switch (type) {
    case "message_new":
      var [message, keyboard, attachment] = await handleMessage(object);
      break;
    default:
      message = "Unknown type of request";
  }

  console.log(message, keyboard);
  var response = await axios.get("https://api.vk.com/method/messages.send", {
    params: {
      message,
      user_id: object.from_id,
      access_token: groupToken,
      attachment,
      keyboard,
      v: "5.80"
    }
  });
  console.log(response);
  return response;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
