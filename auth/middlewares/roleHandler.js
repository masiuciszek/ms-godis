/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/User');

const role = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new Error('Not a admin!');
  }
  next();
});

module.exports = role;
