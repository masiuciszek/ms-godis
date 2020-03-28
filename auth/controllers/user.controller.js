// @ts-nocheck
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    await newUser.generateAuthToken();
    res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'server error' });
  }
};

exports.getMe = asyncHandler(async (req, res, next) => {
  const loggedInUser = await User.findById(req.user._id);

  res.status(200).json({ success: true, data: loggedInUser });
});

exports.getAdmin = asyncHandler(async (req, res, next) => {
  const loggedInUser = await User.findById(req.user._id);

  res.status(200).json({ success: true, data: loggedInUser });
});
