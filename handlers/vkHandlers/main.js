var handleConfirm = require("./confirmation");
var handleMessage = require("./message");
var { groupToken } = require("../../config/vkConfig");

module.exports = ({ type, object }) => {
  switch (type) {
    case "confirmation":
      return handleConfirm();
    case "message_new":
      const [message, attachment] = handleMessage(object);
      return {
        message,
        user_id: object.from_id,
        access_token: groupToken,
        attachment,
        v: "V"
      };
    default:
      return "Unknown type of request.";
  }
};
