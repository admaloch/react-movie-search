const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController');
// const authorizeUser = require('../middleware/authorizeUser');

router.route('/register')
    .post(usersController.register);

router.route('/login')
    .post(usersController.login)

router.route('/logout', usersController.logout)

router.route('/user')
    .get(usersController.getAllUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router