const express = require("express");
const featchuser = require("../middleware/featchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const schedule = require('node-schedule');

const moment = require('moment');


let success=false;
//Route 1:- Get User Notes  GET:http://localhost:5000/api/notes/fetchnotes Login required
router.get("/fetchnotes", featchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
    success=true;
  } catch (error) {
    success=false;
    res.status(500).json({success:success, error: "server Error", message: error.message });
  }
});

//Route 2:- Add User Notes  POST:http://localhost:5000/api/notes/addnote Login required
router.post(
  "/addnote",
  featchuser,
  [
    body("title", "Minimum Length of title is 3").isLength({ min: 3 }),
    body("description", "Minumum Length of Desciption is 5").isLength({
      min: 5,
    }),
    body("reminder","Reminder date is Required").notEmpty(),
  ],
  async (req, res) => {
    //Check the errors exits or not
    const { title, description, tag ,reminder } = req.body; //destructuring
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({ success:success,errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        reminder: reminder,
        user: req.user.id,
      });
      const savenote = await note.save();
      success=true
      res.json({success:success,savenote});
    } catch (error) {
      success=false;
      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);

//Route 3:- Update User Notes  PUT:http://localhost:5000/api/notes/updatenote/:id Login required
router.put(
  "/updatenote/:id",
  featchuser,
  [
    body("title", "Minimum Length of title is 3").isLength({ min: 3 }),
    body("description", "Minumum Length of Desciption is 5").isLength({
      min: 5,
    }),
    body("reminder","Reminder date is Required").notEmpty(),
  ],
  async (req, res) => {
    //Check the errors exits or not
    const { title, description,reminder, tag } = req.body; //destructuring
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Create a new note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      if (reminder) {
        newNote.reminder = reminder;
      }
      newNote.emailstatus=false;
      //Find the note is exisit or not using id
      let note = await Note.findById(req.params.id); //req.params.id=given id in URL
      if (!note) {
        return res.status(404).send("Not Found");
      }
      //Check the user id and the user who created this note is same or note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id, //req.params.id=given id in URL
        { $set: newNote },
        { new: true }
      );
      success=true;
      res.json({success:success, note });
    } catch (error) {
      success=false;
      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);

//Route 3:- Delete User Notes  DELETE:http://localhost:5000/api/notes/deletenote/:id Login required
router.delete("/deletenote/:id", featchuser, async (req, res) => {
  //Check the errors exits or not
  try {
    //Check the note with given noteid is exists or not
    let note = await Note.findById(req.params.id); //req.params.id=given id in URL
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Check the user id and the user who created this note is same or note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    success=true
    res.json({ success:success, note: note });
  } catch (error) {

    //status(500)=Server Error Code
    success=false;
    res.status(500).json({success:success, error: "server Error", message: error.message });
  }
});

//Delete the when reminder time match currunt time
const job1 = schedule.scheduleJob('*/1 * * * *',async function(){ //run every 1 minute
    const currentdate=new Date();
  
    //  Find reminders scheduled with current time or less than current time
     const notes = await Note.find({
      reminder: { $lte: currentdate }, //date less than or equal to current date
    });
    
    if(notes.length!==0)
    {
      try{
        //  console.log(notes);
        for(i=0;i<notes.length;i++){
           const id=notes[i]._id.toString(); //Store id in variable id
           await Note.findByIdAndDelete(id);
          } 
        }catch (error) {
            console.log('Error in delete note Sachdular');
          }
      }
  });
module.exports = router;
