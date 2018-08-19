var { getUserDataById } = require("../../others/userData");
module.exports = async id => {
  const { first_name } = await getUserDataById(id);
  const msg = `Добро пожаловать, ${first_name}! Прежде всего мне нужно определить, в какой группе ты учишься. Для начала напиши название своего института.`;
  const keyboard = {
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
  };
  return [msg, keyboard, null];
};
