const express = require('express');


const { deleteUser,getAllUsers,getUserInfo,updateUser,userAccountCreation,userLogin } = require('../controllers/users')



const router = express.Router();

router.route('/user-creation').post(userAccountCreation);

router.route("/users").get(getAllUsers);

router.route('/user/:userId').get(getUserInfo)

router.route('/update-user/:userId').put(updateUser)

router.route('/delete-user/:userId').delete(deleteUser)

router.route('/user-login').post(userLogin)


module.exports = router


