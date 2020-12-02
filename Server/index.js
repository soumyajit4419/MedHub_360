const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const auth = require("./Routes/auth");
const app = express();
port = 3600;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res, next) {
  return res.json({ status: 200, mesage: "Server Running" });
});

app.use("/auth", auth);

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
