const CronJob = require("cron").CronJob;
var User = require("../../dbHandlers/userSchema");

const job = new CronJob(
  "00 40 20 * * *",
  function() {
    console.log("fire!");
  },
  null,
  false,
  "Europe/Saratov"
);

job.start();
