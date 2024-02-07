const express = require("express");
const nodemailer = require('nodemailer');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Email = require("../models/email");
const router = express.Router();

require('dotenv').config({ path: '.env.local' });

let success=false;
// Route 1:- Send Email API = 'http://localhost:5000/api/email/sendotp'
router.post('/sendotp', async (req, res) => {
    
    const { to } = req.body;
    // Create a Nodemailer transporter
    
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "smtp.example.com",
        // port: 587,
        // secure: false,
        auth: {
          user: process.env.EMAIL_ADD,
          pass: process.env.EMAIL_APP_PASS
        }
      });
      let email= await User.findOne({email:to}); //Check that user with this email exits or not
      if(!email){
        success=false;
        return res.status(401).send({success:success,message:"Email Doesn't exits"})
      }
      const otp=Math.floor(1000+Math.random()*9000);  //Genrate 4 digit OTP
      email=await Email.findOneAndUpdate({email:to},{otp:otp},{new:true}); //update the otp with new one if alredy have one
      if(!email){
          email=await Email.create({              //Store that OTP with email in Database
              email:to,
              otp:otp
          });
      }
      // Setup email data
      const mailOptions = {
        from:  'Keep-Notes ' + process.env.EMAIL_ADD, //`Keep-Notes  ${process.env.EMAIL_ADD}`,
        to:to,
        subject:'OTP',
        html:'<h2>Your OTP for Forget Password</h2><h1 style="text-align:center">' + otp +'</h1>'
      };
    
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          success=false;
          return res.status(500).send({success:success,message:error.toString()});
        }
        success=true;
        res.status(200).send({success:success,message:'Email sent: ' + info.response});
      }); 
    } catch (error) {
      success=false;
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  });

  // Route 2:- Check OTP API = http://localhost:5000/api/email/checkotp
  router.post('/checkotp', async (req, res) => {
    
    const { email,otp } = req.body;
    // Create a Nodemailer transporter
    
    try {
      let checkotp= await Email.findOne({email:email,otp:otp});
      if(!checkotp){
        success=false;
        return res.status(200).send({success:success,message:"OTP Doesn't match"})
      }
      success=true;
      return res.status(200).send({success:success});
   
    } catch (error) {
      success=false;
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  });

  //Route 3 :- Change User Password POST:http://localhost:5000/api/email/Changepassword Login Does not required
router.put(
  "/Changepassword",
  [
    body("password", "Minumum Lenth of name is 3").isLength({ min: 3 }),
    body("email", "Enter Valid E-Mail").isEmail(),
  ],
  async (req, res) => {
    const { password,email ,otp} = req.body; //destructuring
    const errors = validationResult(req);
    //Check the errors exits or not
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ success:success,errors: errors.array() });
    }
    try {
      //Find the User is exisit or not using email
      let user = await User.findOne({email:email}); //req.params.id=given id in URL
      if (!user) {
        success=false;
        return res.status(404).send({success:success,message:"Not Found"});
      }
      let checkotp= await Email.findOne({email:email,otp:otp});
      if(!checkotp){
        success=false;
        return res.status(200).send({success:success,message:"Wrong OTP"})
      }
      //Encrypt password
      var salt = await bcrypt.genSaltSync(10);
      const SecurePass = await bcrypt.hash(password, salt);
      user = await User.findOneAndUpdate(
        {email:email}, //req.params.id=given id in URL
        { password: SecurePass },
        { new: true }
      ).select("-password");
      success=true;
      res.json({success:success, message:'Password Updated' });
    } catch (error) {
      success=false;
      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);

//Route 4:- Check email GET:http://localhost:5000/api/email/Checkemail Login Does not required

router.post("/Checkemail", async (req, res) => {
  try {
    const {email}=req.body;
    let check= await User.findOne({email:email}); //Check that user with this email exits or not
    if(!check){
      success=true;
      return res.status(200).send({success:success})
    }
    success=false;
    res.status(400).send({success:success,message:'Email Alredy Exits'});
  } catch (error) {
    success=false;
    //status(500)=Server Error Code
    res.status(500).json({success:success,error: "server Error", message: error.message });
  }
});



module.exports = router;
