const User = require('../model/user')


async function userSignUp(req ,res) {
    const {name , email , password} = req.body
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}
async function userLogIn(req ,res) {
    const {email , password} = req.body
    const user =   await User.findOne({
        email,
        password,
    });

    if(!user) return res.render('login' , {
        error: "Invalid Username or Password"
    })

    return res.redirect('/');
}

module.exports = {
    userSignUp,
    userLogIn
}