const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const auth = require("./Routes/auth");
const user = require("./Routes/user");
const doc = require("./Routes/doc");
const app = express();
port = 3600;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res, next) {
  return res.json({ status: 200, mesage: "Server Running" });
});

app.use("/auth", auth);
app.use("/user", user);
app.use("/doc", doc);

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
