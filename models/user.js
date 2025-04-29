const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);