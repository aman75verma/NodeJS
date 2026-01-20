const express = require("express");
const app = express();
const PORT = 8001;
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter') 
const { connectDb } = require("./config");
const path = require('path')

app.set('view engine' , 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute);
app.use("/api", urlRoute);
//dbConnection

connectDb("mongodb://localhost:27017/urlShortner");
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
