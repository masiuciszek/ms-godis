const express = require('express');

const router = express.Router();
const {
  login,
  logoutSession,
  logoutAllSessions,
} = require('../controllers/auth.controller');
const auth = require('../middlewares/authHandler');

router.route('/login').post(login);

router.route('/logout').post(auth, logoutSession);
router.route('/logoutall').post(auth, logoutAllSessions);

module.exports = router;
