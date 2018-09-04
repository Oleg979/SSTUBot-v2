var axios = require("axios");
var { authToken } = require("../../../config/vkConfig");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getUserDataById = async id => {
  const res = await axios.get(
    `https://api.vk.com/method/users.get?user_ids=${id}&access_token=${authToken}&v=5.80`
  );
  console.log(res.data);
  return res.data.response[0];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getUserDataById
};
