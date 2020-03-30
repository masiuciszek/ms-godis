const { connection } = require('../config/db');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getCandies = asyncHandler(async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM candies';
  console.log(req.user);
  if (req.user.role !== 'admin') {
    throw new Error('you are not a admin!');
  }
  connection.query(sqlQuery, (err, response, fields) => {
    if (err) {
      next(err);
    }
    res.status(200).json({ success: true, data: response });
  });
});
