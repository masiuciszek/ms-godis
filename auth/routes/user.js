const express = require('express');
const auth = require('../middlewares/authHandler');

const router = express.Router();
const { register, getMe, getAdmin } = require('../controllers/user.controller');

router.route('/register').post(register);
router.route('/me').get(auth, getMe);
router.route('/admin').get(auth, getAdmin);

module.exports = router;
