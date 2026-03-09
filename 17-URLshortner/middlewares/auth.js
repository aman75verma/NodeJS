const { getUser } = require('../service/auth')
async function restrictToLoggedInUserOnly(req,res,next){
    // const userUid = req.cookies.uid; //basically token value
    const userUid = req.header('Authorization'); //basically token value
    if(!userUid) return res.render('login' , { error : "No token found"});


    const token = userUid.split('Bearer ')[0] // Authorization : Bearer 23uhjfu5 ---> [23ujhg]
    const user = getUser(token) //returns decoded playload
    // const user = getUser(userUid) //returns decoded playload
    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly}