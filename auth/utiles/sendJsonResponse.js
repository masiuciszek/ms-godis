// Get token from model, create cookie and send response
const sendJsonResponse = async (user, statusCode, res) => {
  // Create token
  const token = await user.generateAuthToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options) // name of cookie, cookie value and options
    .json({
      success: true,
      token,
    });
};

module.exports = sendJsonResponse;
