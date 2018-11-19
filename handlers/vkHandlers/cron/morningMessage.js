const CronJob = require("cron").CronJob;
var { groupToken } = require("../../../config/vkConfig");
var axios = require("axios");
var User = require("../../dbHandlers/userSchema");
var today = require("../messagesHandlers/actions/today");

const job = new CronJob(
  "00 30 6 * * *",
  function() {
    console.log("Morning message fired!");
    User.find({}, (err, users) => {
      if (err) return console.log("Evening message: Problem fetching users");
      users.forEach(user => {
        if (!user.isSubscribed) return;
        today(user.id).then(res => {
          axios.get("https://api.vk.com/method/messages.send", {
            params: {
              message: res[0],
              user_id: user.id,
              access_token: groupToken,
              v: "5.80"
            }
          });
        });
      });
    });
  },
  null,
  false,
  "Europe/Saratov"
);

job.start();
