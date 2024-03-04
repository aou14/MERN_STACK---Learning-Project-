const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// fleshing out the variables needed for implementing an input form
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // unique required so users cant sign up with identical emails (which would cause confusion)
        unique: true
    },
    // password saved should be hashed so that if there was as security breach, the passwords would not be readable
    password: {
        type: String,
        required: true
    }
})

// when creating mongoose models, they come with methods like (create, find, findOne, delete)
// can also make custom methods

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    // originally findOne would use User, but userModel exports User. 
    // Therefore using 'this' would be pointing to itself allowing the method to work
    const exists = await this.findOne({ email })

    // uses throw so that we can catch the error later on in another file
    if (exists) {
        throw Error('Email already in use') 
    }

    // bcrypt uses 'salt' which adds a random string of character after the password before hashing
    // if there are identical passwords, salt will essentially make them different (mypasswordj34509gfjdfsgj435 and mypassword435ihj3ui3yj2j)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)