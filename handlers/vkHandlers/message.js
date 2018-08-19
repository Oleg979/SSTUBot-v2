var { getUserDataById } = require("./others/userData");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ from_id, text }) => {
  const { first_name } = await getUserDataById(from_id);
  const text = `Добро пожаловать, ${first_name}! Прежде всего мне нужно определить, в какой группе ты учишься. 
  Для начала напиши название своего института.`;
  const keyboard = {
    one_time: false,
    buttons: [
      [
        {
          action: {
            type: "text",
            label: "ИНПИТ"
          },
          color: "primary"
        },
        {
          action: {
            type: "text",
            label: "ИСПМ"
          },
          color: "primary"
        }
      ],
      [
        {
          action: {
            type: "text",

            label: "УРБАС"
          },
          color: "primary"
        },
        {
          action: {
            type: "text",
            label: "ИНЭТМ"
          },
          color: "primary"
        }
      ],
      [
        {
          action: {
            type: "text",

            label: "ИНЭТС"
          },
          color: "primary"
        },
        {
          action: {
            type: "text",
            label: "ФТИ"
          },
          color: "primary"
        }
      ]
    ]
  };
  return [text, keyboard, null];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
