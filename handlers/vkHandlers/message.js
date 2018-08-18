var { getUserDataById } = require("./others/userData");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ from_id, text }) => {
  const { first_name } = await getUserDataById(from_id);
  return [`Привет, ${first_name}`, null];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
