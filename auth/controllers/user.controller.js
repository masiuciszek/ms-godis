const User = require('../models/User');

exports.register = async (req, res, next) => {
  // try {
  //   const user = await User.create(req.body);
  //   res.send('apa');
  //   // res.status(200).json({ success: true, data: user });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500);
  // }
  console.log(req.body);
  const newUser = await User.create(req.body);
  res.send(newUser);
};
