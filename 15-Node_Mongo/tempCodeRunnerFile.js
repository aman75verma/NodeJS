const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const PORT = 8000;

//connection
mongoose
  .connect('mongodb://127.0.0.1:27017/nodeJs')
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log("Mongo error" , err))

  
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },    

    lastName : {
        type: String,
    },    

    email : {
        type: String,
        required : true,
        unique : true,
    },    

    jobTitle : {
        type : String,
        required: true,
    }    

})    
const User = mongoose.model('user' , userSchema)