const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.json({
      status: 500,
      auth: false,
      message: "No token provided.",
    });
  jwt.verify(token, config.secToken(), function (err, decoded) {
    if (err) {
      return res.json({
        status: 500,
        auth: false,
        message: "Failed to authenticate token.",
      });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
