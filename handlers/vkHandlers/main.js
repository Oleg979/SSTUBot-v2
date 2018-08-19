var handleMessage = require("./message");
var { groupToken } = require("../../config/vkConfig");
var axios = require("axios");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ type, object }) => {
  switch (type) {
    case "message_new":
      var [message, attachment] = await handleMessage(object);
      break;
    default:
      message = "Unknown type of request";
  }

  var response = await axios.get("https://api.vk.com/method/messages.send", {
    params: {
      message,
      user_id: object.from_id,
      access_token: groupToken,
      attachment,
      keyboard: {
        one_time: false,
        buttons: [
          [
            {
              action: {
                type: "text",
                payload: '{"button": "1"}',
                label: "Red"
              },
              color: "negative"
            },
            {
              action: {
                type: "text",
                payload: '{"button": "2"}',
                label: "Green"
              },
              color: "positive"
            }
          ],
          [
            {
              action: {
                type: "text",
                payload: '{"button": "3"}',
                label: "White"
              },
              color: "default"
            },
            {
              action: {
                type: "text",
                payload: '{"button": "4"}',
                label: "Blue"
              },
              color: "primary"
            }
          ]
        ]
      },
      v: "V"
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
