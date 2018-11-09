const CronJob = require("cron").CronJob;
var { groupToken } = require("../../../config/vkConfig");
var axios = require("axios");

const job = new CronJob(
  "00 52 20 * * *",
  function() {
    console.log("Проверка связи!");
    axios.get("https://api.vk.com/method/messages.send", {
      params: {
        message: "Hello!",
        user_id: 89945177,
        access_token: groupToken,
        v: "5.80"
      }
    });
  },
  null,
  false,
  "Europe/Saratov"
);

job.start();
