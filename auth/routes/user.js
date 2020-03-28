const express = require('express');
const auth = require('../middlewares/authHandler');

const router = express.Router();
const { register, getMe } = require('../controllers/user.controller');

router.route('/register').post(register);
router.route('/me').get(auth, getMe);

module.exports = router;
