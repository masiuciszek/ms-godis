// @ts-nocheck
const redis = require('redis');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(redisPort);

exports.register = async (req, res, next) => {
  try {
    const { username } = req.body;
    const newUser = await User.create(req.body);
    const token = await newUser.generateAuthToken();
    redisClient.setex(username, 3600, token);
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
