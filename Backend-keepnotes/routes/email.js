const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Email = require("../models/email");
const router = express.Router();
const schedule = require("node-schedule");
const Note = require("../models/Note");

require("dotenv").config({ path: ".env.local" });

let success = false;

//Create a Transporter to send E-mail
const transporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.example.com",
    // port: 587,
    // secure: false,
    auth: {
      user: process.env.EMAIL_ADD,
      pass: process.env.EMAIL_APP_PASS,
    },
  });
  return transporter;
};
// Route 1:- Send Email API = 'http://localhost:5000/api/email/sendotp'
router.post("/sendotp", async (req, res) => {
  const { to } = req.body;
  // Create a Nodemailer transporter

  try {
    let email = await User.findOne({ email: to }); //Check that user with this email exits or not
    if (!email) {
      success = false;
      return res
        .status(401)
        .send({ success: success, message: "Email Doesn't exits" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000); //Genrate 4 digit OTP
    email = await Email.findOneAndUpdate(
      { email: to },
      { otp: otp },
      { new: true }
    ); //update the otp with new one if alredy have one
    if (!email) {
      email = await Email.create({
        //Store that OTP with email in Database
        email: to,
        otp: otp,
      });
    }
    // Setup email data
    const emailhtml=`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Keep-Notes</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Use the following OTP to complete your Forget Password procedures.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Keep-Notes</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Aarsh Prajapati</p>
      </div>
    </div>
  </div>`;
    const mailOptions = {
      from: "Keep-Notes " + process.env.EMAIL_ADD, //`Keep-Notes  ${process.env.EMAIL_ADD}`,
      to: to,
      subject: "OTP",
      html:emailhtml,
    };

    // Send email
    transporter().sendMail(mailOptions, (error, info) => {
      if (error) {
        success = false;
        return res
          .status(500)
          .send({ success: success, message: error.toString() });
      }
      success = true;
      res
        .status(200)
        .send({ success: success, message: "Email sent: " + info.response });
    });
  } catch (error) {
    success = false;
    res
      .status(500)
      .json({
        success: success,
        error: "server Error",
        message: error.message,
      });
  }
});

// Route 2:- Check OTP API = http://localhost:5000/api/email/checkotp
router.post("/checkotp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    let checkotp = await Email.findOne({ email: email, otp: otp });
    if (!checkotp) {
      success = false;
      return res
        .status(200)
        .send({ success: success, message: "OTP Doesn't match" });
    }
    success = true;
    return res.status(200).send({ success: success });
  } catch (error) {
    success = false;
    res
      .status(500)
      .json({
        success: success,
        error: "server Error",
        message: error.message,
      });
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
    const { password, email, otp } = req.body; //destructuring
    const errors = validationResult(req);
    //Check the errors exits or not
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    try {
      //Find the User is exisit or not using email
      let user = await User.findOne({ email: email }); //req.params.id=given id in URL
      if (!user) {
        success = false;
        return res.status(404).send({ success: success, message: "Not Found" });
      }
      let checkotp = await Email.findOne({ email: email, otp: otp });
      if (!checkotp) {
        success = false;
        return res.status(200).send({ success: success, message: "Wrong OTP" });
      }
      //Encrypt password
      var salt = await bcrypt.genSaltSync(10);
      const SecurePass = await bcrypt.hash(password, salt);
      user = await User.findOneAndUpdate(
        { email: email }, //req.params.id=given id in URL
        { password: SecurePass },
        { new: true }
      ).select("-password");
      success = true;
      res.json({ success: success, message: "Password Updated" });
    } catch (error) {
      success = false;
      //status(500)=Server Error Code
      res
        .status(500)
        .json({
          success: success,
          error: "server Error",
          message: error.message,
        });
    }
  }
);

//Route 4:- Check email GET:http://localhost:5000/api/email/Checkemail Login Does not required

router.post("/Checkemail", async (req, res) => {
  try {
    const { email } = req.body;
    let check = await User.findOne({ email: email }); //Check that user with this email exits or not
    if (!check) {
      success = true;
      return res.status(200).send({ success: success });
    }
    success = false;
    res.status(400).send({ success: success, message: "Email Alredy Exits" });
  } catch (error) {
    success = false;
    //status(500)=Server Error Code
    res
      .status(500)
      .json({
        success: success,
        error: "server Error",
        message: error.message,
      });
  }
});

//Send a email to user to remind about note

// const job1 = schedule.scheduleJob('*/5 * * * * *',async function(){ //run every five Secoung
const job1 = schedule.scheduleJob("*/1 * * * *", async function () {
  //run every 1 minute
  const date = new Date();
  const tenMinutesLater = new Date(date.getTime() + 10 * 60 * 1000);

  // Find reminders scheduled within the next 10 minutes
  //  const reminders = await Note.find({
  //   reminder: { $gte: date, $lte: tenMinutesLater }, //date gretter than current date and less than 10 minutes brfore of currunt date
  // });
  const data = await Note.aggregate([
    {
      $match: {
        // Add your find criteria here
        reminder: { $gte: date, $lte: tenMinutesLater },
        emailstatus: false, //emailstatus is false
      },
    },
    {
      $lookup: {
        from: "users", //Colleaction name
        localField: "user", //Note collection user id
        foreignField: "_id", // User collection user id
        as: "user", //name of filed
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        // Specify the fields to include (1) or exclude (0) from the 'user' document
        "user.password": 0,
      },
    },
  ]);

  if (data.length !== 0) {
    let id;
    try {
      for (i = 0; i < data.length; i++) {
       id = data[i]._id.toString(); //Store id in variable id
        const emailtext = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Note Reminder</title>
              <style>
              h2{
                font-size: 1rem;
            }
                            .row{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              
                            }
                            .col{
                                width: 70%;
                                height: fit-content;
                                padding: 20px 20px;
                                border: 2px solid black;
                                border-radius: 10px;
                            }
                            .title{
                              width: 100%;
                              height: 35px;
                              overflow: auto;
                              text-align: left;
                          }
                          .ro1{
                            display:flex;
                            border-bottom:2px solid #AAAAAA;
                            justify-content: space-between;
                          }
                          .tag{
                              width: fit-content;
                              padding: 7px;
                              background-color: #4681f4;
                              color: white;
                              margin-bottom:10px;
                              border-radius: 15px;
                              font-size: 0.8rem;
                          }
                          .description{
                            margin-top:10px;
                              height: 80px;
                              overflow: auto;
                              margin-bottom:15px;
                    
                          }         
                          
            @media only screen and (max-width: 880px) {
              .col{
                width:90%;
              }
            }
          </style>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Keep-Notes</a>
      </div>
      <p style="font-size:1.1em">Hi  ${data[i].user.name},</p>
       <p>This is Reminder About your ${data[i].title} Note.</p>
              <div class='row'><div class='col'>
              <div class="ro1">
              <div class='title'><h2>${data[i].title}</h2></div>
              <div class='tag'>${data[i].tag}</div>
              </div>
              <div class="description"><h2>${data[i].description}</h2></div>
              </div>
              </div>
              <h2>This Note Will delete automatically at reminder time</h2>
      <p style="font-size:0.9em;">Regards,<br />Keep-Notes</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Aarsh Prajapati</p>
      </div>
    </div>
    </div>
          </body>
          </html>`;
        const mailOptions = {
          from: "Keep-Notes " + process.env.EMAIL_ADD,
          to: data[i].user.email,
          subject: "Gentle Reminder",
          html: emailtext,
        };

        const emailstatus = { emailstatus: true };
        const note = await Note.findByIdAndUpdate(
          id,
          { $set: emailstatus },
          { new: true }
        );
        await transporter().sendMail(mailOptions, async (error, info) => {
          if (error) {
            const emailstatus = { emailstatus: false };
            const note = await Note.findByIdAndUpdate(
              id,
              { $set: emailstatus },
              { new: true }
            );
            return;
          }
        });
      }
    } catch (error) {
      const emailstatus = { emailstatus: false };
      const note = await Note.findByIdAndUpdate(
        id,
        { $set: emailstatus },
        { new: true }
      );
      console.log("Error in Reminder Sachdular"+ error);
    }
  }
});

module.exports = router;
