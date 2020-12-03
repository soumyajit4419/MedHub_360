const express = require("express");
const router = express.Router();
const verifyToken = require("../Utils/verifyToken");
const userdata = require("../Models/userDb");


// Verify Route
router.post("/verify" , verifyToken, (req,res) =>{
    const id = req.userId;

    if(!id){
        return res.json({ status: 422, message: "Missing User ID" });
    }

    userdata.findById(id, (err, user) => {
        if (err) {
            return res.json({status: 500, message: "Server Error"});
        }

        if (!user) {
            return res.json({status: 422, message: "User Not found"});
        }

        if (user.isVerified === true) {
            return res.json({ status: 400, message: "User Already Verified" });
        }

 });

});

// Updating all the user sugar details after loging in
router.post("/updatesugardetails",verifyToken, (req,res)=> {

    const id = req.userId;

    if(!id){
        return res.json({ status: 422, message: "Missing User ID" });
    }

    userdata.findById(id, (err, user) => {
        if (err) {
            return res.json({status: 500, message: "Server Error"});
        }

        if (!user) {
            return res.json({status: 422, message: "User Not found"});
        }

        if (user.isVerified === true) {
            return res.json({ status: 400, message: "User Already Verified" });
        }
        
        let date=req.body.date;
        let bloodGlucoseF=req.body.bloodGlucoseF;
        let bloodGlucosePP=req.body.bloodGlucosePP;
    
        if(!date){
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; 
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            newdate =  day + "/" +  month + "/"  + year + " " + "GMT";

            date= newdate;

        }
        else {
            date = date + " " + "GMT";
        }


        if(!bloodGlucoseF){
            bloodGlucoseF=0;
        }

        if(!bloodGlucosePP){
            bloodGlucosePP=0;
        }

        user.sugar.push({ date:date ,bloodGlucoseF:bloodGlucoseF ,bloodGlucosePP:bloodGlucosePP });
        user.save();
        
        return res.json({
            status: 200,
            message: "Updated the Sugar data sucessfully",
          });

    });

});

// Updating all the user blood count details after loging in
router.post("/updatebloodcountdetails",verifyToken, (req,res)=> {

    const id = req.userId;

    if(!id){
        return res.json({ status: 422, message: "Missing User ID" });
    }

    userdata.findById(id, (err, user) => {
        if (err) {
            return res.json({status: 500, message: "Server Error"});
        }

        if (!user) {
            return res.json({status: 422, message: "User Not found"});
        }

        if (user.isVerified === true) {
            return res.json({ status: 400, message: "User Already Verified" });
        }
        
        let date=req.body.date;
        let hemoglobin=req.body.hemoglobin;
        let rbcCount=req.body.rbcCount;
        let platelateCount=req.body.platelateCount;
        // console.log(date);
        // console.log(hemoglobin);
        // console.log(rbcCount);

        if(!date){
            var dateObj = new Date();
            var day = dateObj.getUTCDate();
            var month = dateObj.getUTCMonth() + 1; 
            var year = dateObj.getUTCFullYear();

            newdate =  day + "/" +  month + "/"  + year + " " + "GMT";

            date= newdate;

        }
        else {
            date = date + " " + "GMT";
        }
  
        if(!hemoglobin){
            hemoglobin=0;
        }

        if(!rbcCount){
            rbcCount=0;
        }

        if(!platelateCount){
            platelateCount=0;
        }

        user.bloodCount.push({ date:date ,hemoglobin:hemoglobin ,rbcCount:rbcCount,platelateCount:platelateCount});
        user.save();
        
        return res.json({
            status: 200,
            message: "Updated the Blood Count Data sucessfully",
          });

    });

});

// Get alluser deatils
router.get("/getalluserdata",verifyToken, (req,res)=>{
 
    const id = req.userId;

    if(!id){
        return res.json({ status: 422, message: "Missing User ID" });
    }

    userdata.findById(id, (err, user) => {
        if (err) {
            return res.json({status: 500, message: "Server Error"});
        }

        if (!user) {
            return res.json({status: 422, message: "User Not found"});
        }

        if (user.isVerified === true) {
            return res.json({ status: 400, message: "User Already Verified" });
        }

        return res.json({ status: 200, data: user});

    });

});



module.exports = router;
