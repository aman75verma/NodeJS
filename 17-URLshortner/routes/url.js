const express = require("express");
const urlRouter = express.Router();
const {generateNewShortUrl , numOfClicks ,getUrlById} = require("../controller/url")
const {alreadyThere} = require('../middlewares/check')


urlRouter
    .post('/url',alreadyThere,generateNewShortUrl)
    .get('/url/analytics/:id',numOfClicks)
    .get('/:id',getUrlById)



module.exports = urlRouter;