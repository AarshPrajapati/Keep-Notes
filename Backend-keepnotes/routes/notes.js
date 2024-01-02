const express = require("express");
const featchuser = require("../middleware/featchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");


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
  ],
  async (req, res) => {
    //Check the errors exits or not
    const { title, description, tag } = req.body; //destructuring
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
        user: req.user.id,
      });
      const savenote = await note.save();
      success=true
      res.json({success:success,savenote});
    } catch (error) {
      success=false;
      //console.error(error.message);
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
  ],
  async (req, res) => {
    //Check the errors exits or not
    const { title, description, tag } = req.body; //destructuring
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
      //console.error(error.message);
      //status(500)=Server Error Code
      res.status(500).json({ success:success,error: "server Error", message: error.message });
    }
  }
);

//Route 3:- Delete User Notes  DELETE:http://localhost:5000/api/notes/deletenote/:id Login required
router.delete("/deletenote/:id", featchuser, async (req, res) => {
  //Check the errors exits or not
  const { title, description, tag } = req.body; //destructuring
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
    //console.error(error.message);
    //status(500)=Server Error Code
    success=false;
    res.status(500).json({success:success, error: "server Error", message: error.message });
  }
});
module.exports = router;
