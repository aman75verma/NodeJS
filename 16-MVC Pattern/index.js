const express = require('express');
// const fs = require("fs")
const {logReqRes }= require('./middlewares')
// const { default: mongoose } = require('mongoose');
const {connectMongoDb} = require("./config")
const app = express()
const PORT = 8000;
const userRouter = require('./routes/user');
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//connection
// mongoose
//   .connect('mongodb://127.0.0.1:27017/nodeJs')
//   .then(() => console.log("Mongoose Connected"))
//   .catch((err) => console.log("Mongo error" , err))
connectMongoDb("mongodb://127.0.0.1:27017/nodeJs")

  
// const userSchema = new mongoose.Schema({
//     firstName : {
//         type : String,
//         required : true,
//     },    

//     lastName : {
//         type: String,
//     },    

//     email : {
//         type: String,
//         required : true,
//         unique : true,
//     },    

//     jobTitle : {
//         type : String,
//         required: true,
//     }    

// })    
// const User = mongoose.model('user' , userSchema)

//middleware plugin 

// app.use((req,res,next) => {
//     fs.appendFile(
//         "log.txt",
//         `\n${new Date.toLocaleString()}: ${req.ip} ${req.method} : ${req.path}\n`,
//         (err,data) => {
//             next();
//         }
//     );
// });
app.use(logReqRes("logs.txt"))


//routing
app.get('/users' , async (req,res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
        .join("")}
    </ul>
    `;
    res.send(html);
});


// app.route("/api/users")
//     .get(async (req,res) => {
//         const allDbUsers = await User.find({});
//         return res.json(allDbUsers);
//     })
//     .post(async(req,res) => {
//      const body = req.body;
//      if(
//         !body ||
//         !body.firstName||
//         !body.lastName||
//         !body.email||
//         !body.gender||
//         !body.jobTitle
//      ) return res.status(400).json({msg : "All fields are required"});
//      await User.create(body);
//      return res.json({status:"success"});
//     })

// app.route("/api/users/:id")
//    .get(async (req,res) => {
//     const user = await User.findById(req.params.id);
//     if(!user) return res.status(404).json({error : 'user not found'});
//     return res.json(user);
//    })
//    .patch(async (req,res) => {
//     await User.findByIdAndUpdate(req.params.id ,{lastName :"Changed"});
//     return res.json({status : "success"});
//    })
//    .delete(async (req,res) => {
//     await User.findByIdAndDelete(req.params.id);
//     return res.json({status : "Success"});
//    });

app.use('/api/user' , userRouter)



app.listen(PORT , ()=>console.log(`Server is running at http://localhost:${PORT}`))
