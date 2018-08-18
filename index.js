//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up Express server
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import handlers
var handleVkRequest = require("./handlers/vkHandlers/main");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle GET request
app.get("/", (req, res) => {
  res.send("Bot is running...");
});

// Handle POST request
app.post("/", (req, res) => {
  res.send("c982a697");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Run the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
