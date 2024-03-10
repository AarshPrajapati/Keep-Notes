const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        require:true
    }, 
    description:{
        type:String,
        require:true
    },
    reminder:{
        type:Date,
        require:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    },
    emailstatus:{
        type:Boolean,
        default:false
    }
  });

module.exports=mongoose.model('note',NoteSchema)