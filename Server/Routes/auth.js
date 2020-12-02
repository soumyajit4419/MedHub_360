const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userDb = require("../Models/userDb");
const docDb = require("../Models/docDb");
const config = require("../config");
const router = express.Router();
let ids = 10000;

//Register User
router.post(
  "/registerUser",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.errors[0].param == "email") {
        return res.json({ status: 400, message: "Invalid email address" });
      } else {
        return res.json({ status: 400, message: "Invalid Password" });
      }
    }
    next();
  },
  function (req, res, next) {
    if (req.body.password != req.body.confirmPassword) {
      return res.json({ status: 400, message: "Password Din't match" });
    }

    userDb.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.json({ status: 500, message: "Internal Server Error" });
      } else if (user) {
        return res.json({ status: 400, message: "User already exits" });
      }
      next();
    });
  },
  function (req, res, next) {
    const email = req.body.email.toString().trim();
    const name = req.body.name;
    ids = ids + 1;
    const age = req.body.age;
    const sex = req.body.sex;

    bcrypt.hash(req.body.password, 6, function (err, hashPassword) {
      if (err) {
        return res.json({ status: 500, message: "Internal server error" });
      }
      userDb.create(
        {
          email: email,
          name: name,
          password: hashPassword,
          userId: ids,
          age: age,
          sex: sex,
          bloodPresure: req.body.bloodPresure,
        },
        function (err, user) {
          if (err) {
            return res.json({ status: 500, message: "Internal Server Error" });
          } else {
            return res.json({
              status: 200,
              message: "Registered Successfully",
            });
          }
        }
      );
    });
  }
);

//Register Doctor
router.post(
  "/registerDoc",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.errors[0].param == "email") {
        return res.json({ status: 400, message: "Invalid email address" });
      } else {
        return res.json({ status: 400, message: "Invalid Password" });
      }
    }
    next();
  },
  function (req, res, next) {
    if (req.body.password != req.body.confirmPassword) {
      return res.json({ status: 400, message: "Password Din't match" });
    }

    docDb.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.json({ status: 500, message: "Internal Server Error" });
      } else if (user) {
        return res.json({ status: 400, message: "User already exits" });
      }
      next();
    });
  },
  function (req, res, next) {
    const email = req.body.email.toString().trim();
    const name = req.body.name;
    ids = ids + 1;
    const age = req.body.age;
    const sex = req.body.sex;

    bcrypt.hash(req.body.password, 6, function (err, hashPassword) {
      if (err) {
        return res.json({ status: 500, message: "Internal server error" });
      }
      docDb.create(
        {
          email: email,
          name: name,
          password: hashPassword,
          userId: ids,
          age: age,
          sex: sex,
          bloodPresure: req.body.bloodPresure,
        },
        function (err, user) {
          if (err) {
            return res.json({ status: 500, message: "Internal Server Error" });
          } else {
            return res.json({
              status: 200,
              message: "Registered Successfully",
            });
          }
        }
      );
    });
  }
);

//Login User
router.post(
  "/loginUser",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.errors[0].param == "email") {
        return res.json({ status: 400, message: "Invalid email address" });
      } else {
        return res.json({ status: 400, message: "Invalid Password" });
      }
    }
    next();
  },
  function (req, res, next) {
    userDb.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.json({ status: 500, message: "Internal server error" });
      } else if (!user) {
        return res.json({ status: 400, message: "Invalid Email Address" });
      } else if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (err) {
              return res.json({
                status: 500,
                message: "Internal server error",
              });
            } else if (result) {
              let token = jwt.sign({ id: user._id }, config.secToken(), {
                expiresIn: 60 * 60,
              });
              return res.json({
                status: 200,
                message: "Success",
                token: token,
              });
            } else {
              return res.json({ status: 400, message: "Password Did't match" });
            }
          }
        );
      }
    });
  }
);

//Login Doc
router.post(
  "/loginDoc",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.errors[0].param == "email") {
        return res.json({ status: 400, message: "Invalid email address" });
      } else {
        return res.json({ status: 400, message: "Invalid Password" });
      }
    }
    next();
  },
  function (req, res, next) {
    docDb.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.json({ status: 500, message: "Internal server error" });
      } else if (!user) {
        return res.json({ status: 400, message: "Invalid Email Address" });
      } else if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (err) {
              return res.json({
                status: 500,
                message: "Internal server error",
              });
            } else if (result) {
              let token = jwt.sign({ id: user._id }, config.secToken(), {
                expiresIn: 60 * 60,
              });
              return res.json({
                status: 200,
                message: "Success",
                token: token,
              });
            } else {
              return res.json({ status: 400, message: "Password Did't match" });
            }
          }
        );
      }
    });
  }
);

module.exports = router;
