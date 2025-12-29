//No connection
//This page has code to initialise a schema only. 

const mongoose = require('mongoose')
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
const User = mongoose.model("user" , UserSchema);
module.exports = User;