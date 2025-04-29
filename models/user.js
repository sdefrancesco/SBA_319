const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
      type: String,
      index: true, // Indexed for searching/filtering users by name
    },
    email: {
      type: String,
      unique: true, // Make sure this is unique
      index: true,  // Indexed for login etc
    },
    dob: {
      type: String,
      // Not indexed because searching by DOB is rare
    },
  }, { timestamps: true });

module.exports = mongoose.model('User', userSchema);