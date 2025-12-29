const express = require("express");
const { before } = require("node:test");
const router = express.Router();

// router.get('/users' , async (req,res) => {
//     const allDbUsers = await User.find({})
//     const html = `
//     <ul>
//       ${allDbUsers
//         .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
//         .join("")}
//     </ul>
//     `;
//     res.send(html);
// });


router
    .route('/')
    .get(async (req,res) => {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    })
    .post(async(req,res) => {
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
     return res.status(201).json({status:"success"});
    })

router
   .route('/:id')
   .get(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error : 'user not found'});
    return res.json(user);
   })
   .patch(async (req,res) => {
    await User.findByIdAndUpdate(req.params.id ,{lastName :"Changed"});
    return res.json({status : "success"});
   })
   .delete(async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Success"});
   });

module.exports = router;
