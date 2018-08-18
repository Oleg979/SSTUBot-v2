var handleMessage = require("./message");
var { groupToken } = require("../../config/vkConfig");
var axios = require("axios");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ type, object }) => {
  switch (type) {
    case "message_new":
      const [message, attachment] = await handleMessage(object);
    default:
      return "Unknown type of request.";
  }

  await axios.get("https://api.vk.com/method/messages.send", {
    params: {
      message,
      user_id: object.from_id,
      access_token: groupToken,
      attachment,
      v: "V"
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
