const express = require("express");
const app = express();
const PORT = 8001;
const urlRoute = require("./routes/url");
const {connectDb} = require('./config');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

//dbConnection
connectDb('mongodb://localhost:27017/urlShortner')

app.use('/' , urlRoute);
app.listen(PORT , ()=>console.log(`Server is running on PORT ${PORT}`));