const { nanoid } = require("nanoid");
const URL = require("../model/url");

async function generateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "No url provided" });

  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home" ,{
    id : shortId, //sending id to local to render somehow
  } )
  // return res.json({ id: shortId }).status(200);
};

async function numOfClicks(req, res) {
    const id = req.params.id;
    const data = await URL.findOne({ shortId : id});
    return res.status(200).json({
        totalClicks : data.visitHistory.length,
        analytics : data.visitHistory
    })
};

async function getUrlById(req, res) {
  const id = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: id,
    },
    {
      $push: {
        visitHistory: {timestamp : Date.now(),},
      },
    }
  );
  
  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }
  
  res.redirect(entry.redirectUrl);
};

module.exports = { generateNewShortUrl, numOfClicks, getUrlById };
