const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, updateById, deleteById, addNewUser} = require("../controllers/user");

router
    .route('/')
    .get(getAllUsers)
    .post(addNewUser)

router
   .route('/:id')
   .get(getUserById)
   .patch(updateById)
   .delete(deleteById);


module.exports = router;
