//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up Express server
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Set up VK API
var { appID, appSecret, authToken, mode } = require("./config/vkConfig");
var VK = require("vkapi");
var vk = new VK({
  appID,
  appSecret,
  mode
});
vk.setToken({ token: authToken });

// Import handlers
var handleVkRequest = require("./handlers/vkHandlers/main");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle GET request
app.get("/", (req, res) => {
  res.send("Bot is running...");
});

// Handle POST request
app.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let answer = handleVkRequest(req.body);
  res.send(JSON.stringify(answer));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Run the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
