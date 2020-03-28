/* eslint-disable prefer-destructuring */

const asyncHandler = require('./asyncHandler');

const role = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new Error('Not a admin!');
  }
  next();
});

module.exports = role;
