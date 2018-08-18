var axios = require("axios");
var { appID, appSecret, authToken, mode } = require("../../../config/vkConfig");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getUserDataById = async id => {
  const res = await axios.get(
    `https://api.vk.com/method/users.get?user_ids=${id}&access_token=${authToken}&v=2.58`
  );
  return res.data.response[0];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getUserDataById
};
