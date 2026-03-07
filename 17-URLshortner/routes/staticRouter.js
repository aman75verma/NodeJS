const express = require("express");
const URL = require("../model/url");
const router = require("./user");
const staticRouter = express.Router();

staticRouter.get('/' , async(req,res) => {
    const allUrls = await URL.find({});
    return res.render('home' , {
        urls : allUrls,
    });
})

staticRouter.get('/signup' , (req,res) => {
    // res.send("hi")
    return res.render('signup');
})
staticRouter.get('/login' , (req,res) => {
    // res.send("hi")
    return res.render('login');
})


module.exports = staticRouter;


