const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name'],
  },
  number: {
    type: Number,
    required: [true, 'Number'],
  },
  email: {
    type: String,
    required: [true, 'Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [2, 'Password must be minimum of 2 character'],
  },
  cpassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password',
    },
  },
});

/**@deprecated: Pre middleware to hash password before saving document */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.cpassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
