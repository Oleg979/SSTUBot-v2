//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up Express server
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import handlers
var { confirmToken } = require("./config/vkConfig");
var handleVkRequest = require("./handlers/vkHandlers/main");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle GET request
app.get("/", (req, res) => {
  res.send("Bot is running...");
});

// Handle POST request
app.post("/", (req, res) => {
  if (req.body.type == "confirmation") {
    res.send(confirmToken);
    return;
  }
  res.setHeader("Content-Type", "application/json");
  handleVkRequest(req.body)
    .then(data => res.send(JSON.stringify(data)))
    .catch(console.log);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Run the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
