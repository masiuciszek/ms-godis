/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/User');

const auth = asyncHandler(async (req, res, next) => {
  const token =
    req.header('Authorization').split(' ')[1] || req.header('x-auth-token');
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   // Set token from Bearer token in header
  //   token = req.headers.authorization.split(' ')[1];
  //   // Set token from cookie
  // } else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // console.log(token);

  if (!token) {
    throw new Error('NOT AUTHORIZED!');
  }

  const decoded = jwt.verify(token, 'secret');
  const user = await User.findOne({
    _id: decoded.id,
    'sessionTokens.token': token,
  });
  // 'sessionTokens.token': token
  if (!user) {
    throw new Error('NOT AUTHORIZED!');
  }

  req.user = user;
  req.token = token;
  // console.log(decoded);
  // console.log(token);
  // console.log('COOKIES', req.cookies);
  next();
});

module.exports = auth;
