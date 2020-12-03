const express = require("express");
const verifyToken = require("../Utils/verifyToken");
const docData = require("../Models/docDb");
const userData = require("../Models/userDb");
const router = express.Router();

router.get("/verify", verifyToken, function (req, res, next) {
  const id = req.userId;
  docData.findById(id, function (err, user) {
    if (err) {
      return res.json({ status: 500, message: "Internal Server Error" });
    } else if (!user) {
      return res.json({ status: 400, message: "Not valid user" });
    } else {
      return res.json({ status: 200, message: "Success valid user" });
    }
  });
});

// Updating all the user sugar details after loging in
router.post("/updateSugarDetails", verifyToken, (req, res) => {
  const id = req.userId;

  docData.findById(id, (err, user) => {
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

      newdate = day + "/" + month + "/" + year + " " + "GMT";

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

  docData.findById(id, (err, user) => {
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

      newdate = day + "/" + month + "/" + year + " " + "GMT";

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

// Get a user details
router.get("/getUserData", verifyToken, (req, res) => {
  const id = req.userId;

  docData.findById(id, { _id: 0, password: 0 }, (err, user) => {
    if (err) {
      return res.json({ status: 500, message: "Server Error" });
    }

    if (!user) {
      return res.json({ status: 422, message: "User Not found" });
    }

    return res.json({ status: 200, data: user });
  });
});

// Get a patient details
router.get(
  "/getPatientData",
  verifyToken,
  function (req, res, next) {
    const id = req.userId;
    docData.findById(id, function (err, user) {
      if (err) {
        return res.json({ status: 500, message: "Internal Server Error" });
      } else if (!user) {
        return res.json({ status: 400, message: "Not valid user" });
      }
      next();
    });
  },
  function (req, res, next) {
    userData.findOne(
      { userId: req.body.Id },
      { _id: 0, password: 0 },
      function (err, user) {
        if (err) {
          return res.json({ status: 500, message: "Internal Server Error" });
        } else if (!user) {
          return res.json({ status: 400, message: "Not valid user ID" });
        } else if (user) {
          return res.json({ status: 200, data: user });
        }
      }
    );
  }
);

module.exports = router;
