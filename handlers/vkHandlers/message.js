var { getUserDataById } = require("./others/userData");
var {
  defineInstitute
} = require("./messagesHandlers/registration/defineInstitute");
var User = require("../dbHandlers/userSchema");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ user_id, body, payload }) => {
  console.log(payload);
  const arr = await defineInstitute(user_id);
  return arr;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
