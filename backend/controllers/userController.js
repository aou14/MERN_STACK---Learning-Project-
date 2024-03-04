// uses User for the users collection in the db to save or get records
const User = require('../models/userModel')


// login user
// when a user logs in, the password match would be between 2 hashed passwords
const loginUser = async (req, res) => {
    // sends a response to the server
    res.json({mssg: 'login user'})
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    // sends a response to the server
    // res.json({mssg: 'signup user'})
}

module.exports = { signupUser, loginUser }