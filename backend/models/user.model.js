const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true, },
    role: { type: String, default: 'user' },
    isAdmin: { type: Boolean, default: false },

}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User