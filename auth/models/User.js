// @ts-nocheck
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// HASH PASSWORD WHEN USER SIGN UP
UserSchema.pre('save', async function(next) {
  const user = this;
  const salt = await bcrypt.genSalt(8);
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// GENERATE AUTH TOKEN AND STORE IT IN A SESSION ARRAY ON THE SERVER
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {
    expiresIn: '30d',
  });
  user.sessionTokens = user.sessionTokens.concat({ token });
  await user.save();
  return token;
};

// COMPARE INPUT PASSWORD WITH HASHED PASSWORD
UserSchema.methods.comparePassword = async function(inputPassword) {
  const user = this;
  const isMatched = await bcrypt.compare(inputPassword, user.password);

  return isMatched;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
