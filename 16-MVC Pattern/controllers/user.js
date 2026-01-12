const User = require('../models/user')

// GET/api/user
async function getAllUsers(req,res) {
    const allDbUsers = await User.find({});
    return res.status(200).json(allDbUsers);
}

// POST/api/user
addNewUser = async(req,res) => {
     const body = req.body;
     if(
        !body ||
        !body.firstName||
        !body.lastName||
        !body.email||
        !body.gender||
        !body.jobTitle
     ) return res.status(400).json({msg : "All fields are required"});
     const result = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        email: body.email,
        gender : body.gender,
        jobTitle : body.jobTitle
     });
     return res.status(201).json({status:"success" , id : result._id});
}


// GET/api/user/:id
async function getUserById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error : 'user not found'});
    return res.json(user);
}

// PATCH/api/user/:id
updateById = async (req,res) => {
    await User.findByIdAndUpdate(req.params.id ,{lastName :"Changed"});
    return res.json({status : "success"});
}


//DELETE/api/user/:id
deleteById = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Success"});
}



module.exports = {
    getAllUsers,
    getUserById,
    updateById,
    deleteById,
    addNewUser
}