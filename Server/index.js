const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const app = express();
port = 3600;

// Server connect
app.listen(port, function () {
  console.log(`Server Running at port ${port}`);
});

// mongoose connection
const uri = config.secretId();
mongoose
  .connect(uri)
  .then(function () {
    console.log("Moongose Connection Successful");
  })
  .catch(function (err) {
    console.log(err);
  });
