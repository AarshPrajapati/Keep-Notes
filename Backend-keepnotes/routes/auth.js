const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const featchuser = require("../middleware/featchuser");

const JWT_SECRET = "Aarsh";
//Useing Environment Variable
// let JWT_SECRET = process.env.JWT_SEC
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
      //console.log(Authtoken);
      res.json({success:success,token:Authtoken});
      // res.json(user);
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
    // res.send(req.body);
    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // res.json(req.body);
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
      //Compare Pass
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
      //console.log(Authtoken);
      success=true;
      res.json({success:success,token:Authtoken});
      // res.json(user);
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
    success=falsel
    //status(500)=Server Error Code
    res.status(500).json({success:success,error: "server Error", message: error.message });
  }
});

//Route 4 :-Get User Data POST:http://localhost:5000/api/auth/Updateuser Login required
router.put(
  "/Updateuser/:id",
  featchuser,
  [
    body("name", "Minumum Lenth of name is 3").isLength({ min: 3 }),
    body("email", "Enter Valid E-Mail").isEmail(),
  ],
  async (req, res) => {
    //Check the errors exits or not
    const { name,email } = req.body; //destructuring
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
      if (email) {
        newdetails.email = email;
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
      //console.error(error.message);
      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);
module.exports = router;
