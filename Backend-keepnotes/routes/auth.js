const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const featchuser = require("../middleware/featchuser");
const Email = require("../models/email");
const nodemailer = require('nodemailer');
const { options } = require("./email");


const JWT_SECRET = process.env.JWT_SEC; //Useing Environment Variable

let success=false

//Route 1:- For Create User  POST:http://localhost:5000/api/auth/Createuser Login doesn't required
router.post(
  "/Createuser",
  [
    body("name", "Minumum Lenth of name is 3").isLength({ min: 3 }),
    body("email", "Enter Valid E-Mail").isEmail(),
    body("password", "Password must have a minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Check the errors exits or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      var salt = await bcrypt.genSaltSync(10);
      const SecurePass = await bcrypt.hash(req.body.password, salt);
      //Create a User
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecurePass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const Authtoken = jwt.sign(data, JWT_SECRET);

      res.json({success:success,token:Authtoken});

    } catch (error) {
      success=false;
      if (error.code === 11000) {
        //error code 11000 is a duplicate email error
        //Status(400) Client Error code
        return res
          .status(400)
          .json({success:success, error: "Email already exists", message: error.message });
        //To Show Message in Console
        // return (console.log(error), res.status(400).json({error:'Email already exists',message:error.message}));
      }
      console.error(error);
      //status(500)=Server Error Code
      res.status(500).json({success:success, error: "server Error", message: error.message });
    }
  }
);

//Route 2 :-For Authentication(Login) POST:http://localhost:5000/api/auth/Login Login Does not required
router.post(
  "/Login",
  [
    body("email", "Enter Valid E-Mail").isEmail(),
    body("password", "Password field can't be Empty").notEmpty(),
  ],
  async (req, res) => {
    //Check the errors exits or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      //if user doesn't find with given email id than it returns below error
      if (!user) {
      success=false;
        return res.status(400).json({success:success, Error: "Invalid Details" });
      }
      //Compare Password
      const PasswordCompare = await bcrypt.compare(password, user.password);
      if (!PasswordCompare) {
        success=false;
        return res.status(400).json({ success:success,Error: "Invalid Details" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const Authtoken = jwt.sign(data, JWT_SECRET);
  
      success=true;
      res.json({success:success,token:Authtoken});
      
    } catch (error) {
      success=false;
      console.error({success:success,message:error.message});
      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);

//Route 3 :-Get User Data POST:http://localhost:5000/api/auth/getuser Login required
router.post("/getuser", featchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.json(user);
   
    success=true;
  } catch (error) {
    console.error(error.message);
    success=false;
    //status(500)=Server Error Code
    res.status(500).json({success:success,error: "server Error", message: error.message });
  }
});

//Route 4 :-Update User Data Put:http://localhost:5000/api/auth/Updateuser Login required
router.put(
  "/Updateuser/:id",
  featchuser,
  [
    body("name", "Minumum Lenth of name is 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //Check the errors exits or not
    const { name } = req.body; //destructuring
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ success:success,errors: errors.array() });
    }
    try {
      //Create a new note object
      const newdetails = {};
      if (name) {
        newdetails.name = name;
      }
      //Find the User is exisit or not using id
      let user = await User.findById(req.params.id); //req.params.id=given id in URL
      if (!user) {
        success=false;
        return res.status(404).send({success:success,message:"Not Found"});
      }
      user = await User.findByIdAndUpdate(
        req.params.id, //req.params.id=given id in URL
        { $set: newdetails },
        { new: true }
      ).select("-password");
      success=true;
      res.json({success:success, user });
    } catch (error) {
      success=false;

      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);

//Route 5 :-Verify Email by sending otp Put:http://localhost:5000/api/auth/verifyemail Login Does not required

router.post('/verifyemail', async (req, res) => {
    
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

    const otp=Math.floor(1000+Math.random()*9000);  //Genrate 4 digit OTP
    const email=await Email.findOneAndUpdate({email:to},{otp:otp},{new:true}); //update the otp with new one if alredy have one
    if(!email){
        email=await Email.create({              //Store that OTP with email in Database
            email:to,
            otp:otp
        });
    }
    const emailhtml=`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Keep-Notes</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for Sign up in Keep-Notes. Use the following OTP to complete your Sign Up procedures.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Keep-Notes</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Aarsh Prajapati</p>
      </div>
    </div>
  </div>`;
    // Setup email data
    const mailOptions = {
      from:  'Keep-Notes ' + process.env.EMAIL_ADD, //`Keep-Notes  ${process.env.EMAIL_ADD}`,
      to:to,
      subject:'OTP',
      html:emailhtml
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


module.exports = router;
