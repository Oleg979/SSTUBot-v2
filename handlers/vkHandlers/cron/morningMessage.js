const CronJob = require("cron").CronJob;
var User = require("../../dbHandlers/userSchema");

console.log("cron activated");
const job = new CronJob(
  "00 43 20 * * *",
  function() {
    console.log("fire!");
  },
  null,
  false,
  "Europe/Saratov"
);

job.start();
