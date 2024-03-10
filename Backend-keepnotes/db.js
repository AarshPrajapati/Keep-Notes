const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// const mongoURI = 'mongodb://localhost:27017/keepnotes?directConnection=true&readPreference=primary'
const mongoURI=process.env.MONGO_URL;

//Arrow Function
const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>console.log('Connected to Mongo Succefully')).catch(err=>console.log(err));
}
//Simple Function Useing Await and async
// async function connectToMongo() {
//     await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
//   }
  
  module.exports = connectToMongo;