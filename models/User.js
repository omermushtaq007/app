const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isGuest:{
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema); 
