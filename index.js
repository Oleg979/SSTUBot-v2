//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up Express server
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Set up Mongoose
var mongoose = require("mongoose");
var { mongoURI } = require("./config/dbConfig");
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(
    () => console.log(1),
    err => {
      throw err;
    }
  );

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
  handleVkRequest(req.body)
    .then(data => res.send("ok"))
    .catch(console.log);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Run the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
