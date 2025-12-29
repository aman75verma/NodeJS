const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const PORT = 8000;

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

//connection
mongoose
  .connect('mongodb://127.0.0.1:27017/my-db-1')
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log("Mongo error" , err))


//routing

app.get('/users' , (req,res) => {
    const html = `
    <ul>
    ${User.map(user => `<li>${user.firstName}</li>`).join('')}

    </ul>`

    return res.send(html)
})

app.listen(PORT , ()=>console.log(`Server is running at http://localhost:${PORT}`))
