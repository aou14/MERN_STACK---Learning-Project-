// need to make an instance of the express router for authentication routes
const express = require('express');

// controller functions
// imports functions from the userController.js to be used
const { signupUser, loginUser } = require('../controllers/userController')

// makes an instance of the  express router
const router = express.Router()

// login route
// post request because sending data to the database
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router