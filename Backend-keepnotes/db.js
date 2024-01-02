const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/keepnotes?directConnection=true&readPreference=primary'

//Arrow Function
const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>console.log('Connected to Mongo Succefully')).catch(err=>console.log(err));
}
//Simple Function Useing Await and async
// async function connectToMongo() {
//     await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
//   }
  
  module.exports = connectToMongo;