// @ts-nocheck
const asyncHandler = require('../middlewares/asyncHandler');
const sendJsonResponse = require('../utiles/sendJsonResponse');
const User = require('../models/User');

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid values');
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new Error('Invalid values');
  }

  // res.send('logged in');
  sendJsonResponse(user, 200, res);
});

exports.logoutSession = asyncHandler(async (req, res, next) => {
  req.user.sessionTokens = req.user.sessionTokens.filter(
    token => token.token !== req.token
  );
  await req.user.save();
  // res.clearCookie('token');
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res
    .status(200)
    .json({ success: true, msg: `user ${req.user.username} is logged out` });
});

exports.logoutAllSessions = asyncHandler(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.status(200).json({ success: true, msg: `session cleared` });
});

exports.checkSessionToken = asyncHandler(async (req, res, next) => {
  // console.log(`${req.headers.host} from sql server`);
  console.log(req.headers);
  console.log(req.token);
  // console.log(req.statusMessage);

  res.send('this from auth server');
});
