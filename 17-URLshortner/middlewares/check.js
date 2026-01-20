const URL = require("../model/url");

async function alreadyThere(req,res,next){
    const body = req.body;
    if(!body) return res.status(400).json({message: "Provide URL  to be shorten"});

    const originalUrl = body.url;
    const existing = await URL.findOne({redirectUrl: originalUrl});
    if(existing) return res.render("home", {
        message: "URL already shorten",
        existingId: existing.shortId
    });

    next();
}

module.exports = {alreadyThere};