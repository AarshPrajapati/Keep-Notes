const mongoose = require('mongoose');
const { Schema } = mongoose;


const EmailSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    otp:{
        type:Number,
        require:true,
        unique:true
    }
  });
const Email=mongoose.model('email',EmailSchema);
// User.createIndexes();
module.exports=Email;