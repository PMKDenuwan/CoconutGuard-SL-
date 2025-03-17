// Importing necessary modules and utilities
const User = require('../models/user.model.js') // User model for database interactions
const bcrypt = require('bcryptjs') // bcryptjs for password hashing
const errorHandler = require('../utils/error.js') // Custom error handler for uniform error responses
const jwt = require('jsonwebtoken') // jsonwebtoken for generating tokens for user authentication

// signup function to register new users
const signup = async (req, res, next) => {
    // Extracting user details from the request body
    const { userName, email, password } = req.body

    // Validation: Ensure all fields are filled
    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'))
    }

    // Password hashing for security
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Creating a new user instance with the hashed password
    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    })

    try {
        // Attempting to save the new user to the database
        await newUser.save()
        res.json('Signup Successfully..!!')
    } catch (error) {
        // Forward any errors to the error handler
        next(error)
    }
}

// signin function to authenticate users and issue tokens
const signin = async (req, res, next) => {
    // Extracting credentials from request body
    const { email, password } = req.body

    // Validation: Ensure both email and password are provided
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'))
    }

    try {
        // Attempting to find the user by email
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found'))
        }

        // Verifying the password with the hashed password stored in the database
        const validPassword = bcrypt.compareSync(password, validUser.password)

        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'))
        }

        // Omitting the password from the user details before sending the response
        const { password: pass, ...rest } = validUser._doc

        // Generating a token for the user
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin, role: validUser.role }, process.env.JWT_SECRET)
        // Sending the token in a cookie and user details in the response
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest)

    } catch (error) {
        // Forward any errors to the error handler
        next(error)
    }
}

// signout function to clear the authentication token, effectively logging the user out
const signout = async (req, res, next) => {
    try {
        // Clearing the 'access_token' cookie
        res.clearCookie('access_token').status(200).json("User has been signed out")

    } catch (error) {
        // Forward any errors to the error handler
        next(error)
    }
}

// Exporting the authentication functions to be used in routing
module.exports = { signup, signin, signout }
