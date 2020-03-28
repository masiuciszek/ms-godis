const asyncHandler = require('../middlewares/asyncHandler');

exports.login = asyncHandler(async (req, res, next) => {
  res.send('hello');
});

exports.adminProfile = asyncHandler(async (req, res, next) => {
  res.send('getME');
});

exports.logoutSession = asyncHandler(async (req, res, next) => {
  req.user.sessionTokens = req.user.sessionTokens.filter(
    token => token.token !== req.token
  );
  await req.user.save();
  res
    .status(200)
    .json({ success: true, msg: `user ${req.user.username} is logged out` });
});

exports.logoutAllSessions = asyncHandler(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.status(200).json({ success: true, msg: `session cleared` });
});
