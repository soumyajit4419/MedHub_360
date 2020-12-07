const express = require("express");
const router = express.Router();
const verifyToken = require("../Utils/verifyToken");
const userdata = require("../Models/userDb");
const bcrypt = require("bcryptjs");

// Verify Route
router.get("/verify", verifyToken, (req, res) => {
  const id = req.userId;

  if (!id) {
    return res.json({ status: 422, message: "Missing User ID" });
  }

  userdata.findById(id, (err, user) => {
    if (err) {
      return res.json({ status: 500, message: "Server Error" });
    }

    if (!user) {
      return res.json({ status: 422, message: "User Not found" });
    } else {
      return res.json({ status: 200, message: "Success Valid User" });
    }
  });
});

// Updating all the user sugar details after loging in
router.post("/updateSugarDetails", verifyToken, (req, res) => {
  const id = req.userId;

  if (!id) {
    return res.json({ status: 422, message: "Missing User ID" });
  }

  userdata.findById(id, (err, user) => {
    if (err) {
      return res.json({ status: 500, message: "Server Error" });
    }

    if (!user) {
      return res.json({ status: 422, message: "User Not found" });
    }

    let date = req.body.date;
    let bloodGlucoseF = req.body.bloodGlucoseF;
    let bloodGlucosePP = req.body.bloodGlucosePP;

    if (!date) {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      var newdate = month + "/" + day + "/" + year + " " + "GMT";

      date = newdate;
    } else {
      date = date + " " + "GMT";
    }

    if (!bloodGlucoseF) {
      bloodGlucoseF = 0;
    }

    if (!bloodGlucosePP) {
      bloodGlucosePP = 0;
    }

    user.sugar.push({
      date: date,
      bloodGlucoseF: bloodGlucoseF,
      bloodGlucosePP: bloodGlucosePP,
    });
    user.save();

    return res.json({
      status: 200,
      message: "Updated the Sugar data sucessfully",
    });
  });
});

// Updating all the user blood count details after loging in
router.post("/updateBloodCountDetails", verifyToken, (req, res) => {
  const id = req.userId;

  if (!id) {
    return res.json({ status: 422, message: "Missing User ID" });
  }

  userdata.findById(id, (err, user) => {
    if (err) {
      return res.json({ status: 500, message: "Server Error" });
    }

    if (!user) {
      return res.json({ status: 422, message: "User Not found" });
    }

    let date = req.body.date;
    let hemoglobin = req.body.hemoglobin;
    let rbcCount = req.body.rbcCount;
    let platelateCount = req.body.platelateCount;

    if (!date) {
      var dateObj = new Date();
      var day = dateObj.getUTCDate();
      var month = dateObj.getUTCMonth() + 1;
      var year = dateObj.getUTCFullYear();

      var newdate = month + "/" + day + "/" + year + " " + "GMT";

      date = newdate;
    } else {
      date = date + " " + "GMT";
    }

    if (!hemoglobin) {
      hemoglobin = 0;
    }

    if (!rbcCount) {
      rbcCount = 0;
    }

    if (!platelateCount) {
      platelateCount = 0;
    }

    user.bloodCount.push({
      date: date,
      hemoglobin: hemoglobin,
      rbcCount: rbcCount,
      platelateCount: platelateCount,
    });
    user.save();

    return res.json({
      status: 200,
      message: "Updated the Blood Count Data sucessfully",
    });
  });
});

// Get alluser deatils
router.get("/getUserData", verifyToken, (req, res) => {
  const id = req.userId;

  if (!id) {
    return res.json({ status: 422, message: "Missing User ID" });
  }

  userdata.findById(id, { _id: 0, password: 0 }, (err, user) => {
    if (err) {
      return res.json({ status: 500, message: "Server Error" });
    }

    if (!user) {
      return res.json({ status: 422, message: "User Not found" });
    }

    return res.json({ status: 200, data: user });
  });
});

//Reset Password
router.post("/resetPassword", verifyToken, function (req, res, next) {
  const id = req.userId;
  userdata.findById(id, function (err, user) {
    if (err) {
      return res.json({ status: 500, message: "Server Error" });
    }
    if (!user) {
      return res.json({ status: 422, message: "User Not found" });
    } else {
      const password = req.body.password;
      const newPassword = req.body.newPassword;

      if (newPassword.length < 6) {
        return res.json({ status: 422, message: "Invalid Password Length" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.json({ status: 500, message: "Internal Server Error" });
        }

        if (!result) {
          return res.json({
            status: 422,
            message: "Previous Password Din't Match",
          });
        } else {
          bcrypt.hash(newPassword, 6, function (err, newHashPassword) {
            if (err) {
              return res.json({
                status: 500,
                message: "Internal Server Error",
              });
            } else {
              user.password = newHashPassword;
              user.save();
              return res.json({
                status: 200,
                message: "Password Updated Successfully",
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
