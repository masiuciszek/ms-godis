const { connection } = require('../config/db');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getCompanyProfile = asyncHandler(async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM companies where id = ?';

  if (req.user.role !== 'admin') {
    throw new Error('you are not a admin!');
  }
  connection.query(sqlQuery, [req.params.id], (err, response, fields) => {
    if (err) {
      next(err);
    }
    res.status(200).json({ success: true, data: response });
  });
});
