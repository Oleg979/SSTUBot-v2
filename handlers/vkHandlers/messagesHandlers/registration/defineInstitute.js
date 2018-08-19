var { getUserDataById } = require("./others/userData");
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
            label: "ИНПИТ",
            payload: {
              institute: 1
            }
          },
          color: "primary"
        },
        {
          action: {
            type: "text",
            label: "ИСПМ",
            payload: {
              institute: 2
            }
          },
          color: "primary"
        }
      ],
      [
        {
          action: {
            type: "text",
            label: "УРБАС",
            payload: {
              institute: 3
            }
          },
          color: "primary"
        },
        {
          action: {
            type: "text",
            label: "ИНЭТМ",
            payload: {
              institute: 4
            }
          },
          color: "primary"
        }
      ],
      [
        {
          action: {
            type: "text",
            label: "ИНЭТС",
            payload: {
              institute: 5
            }
          },
          color: "primary"
        },
        {
          action: {
            type: "text",
            label: "ФТИ",
            payload: {
              institute: 6
            }
          },
          color: "primary"
        }
      ]
    ]
  };
  return [msg, keyboard, null];
};
