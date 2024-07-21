const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

//logic in controllers direc at usersController..
//we're already at users as specified in server.js.. now router.route(/) is at root of /users
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router