const CronJob = require("cron").CronJob;
var { groupToken } = require("../../../config/vkConfig");
var axios = require("axios");

const job = new CronJob(
  "00 49 20 * * *",
  function() {
    console.log("fire!");
    axios.get("https://api.vk.com/method/messages.send", {
      params: {
        message: "Hello!",
        user_id: 208990427,
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
