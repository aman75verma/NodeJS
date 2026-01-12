const express = require('express');
const app = express()
const PORT = 8000;
app.use(express.urlencoded({extended : false}));
app.use(express.json());
const {logReqRes }= require('./middlewares')
const {connectMongoDb} = require("./config")
const userRouter = require('./routes/user');

//connection
connectMongoDb("mongodb://127.0.0.1:27017/nodeJs")

//middleware plugin 
app.use(logReqRes("logs.txt"))

//routing
app.use('/api/user' , userRouter)

app.listen(PORT,()=>console.log(`Server is running at http://localhost:${PORT}`))
