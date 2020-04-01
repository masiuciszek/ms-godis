const express = require('express');
const auth = require('../middlewares/authHandler');
const role = require('../middlewares/roleHandler');
const {
  getCompanyProfile,
  getTokenFromClient,
} = require('../controllers/company.controller');

const router = express.Router();

router.route('/').get(auth, getTokenFromClient);
router.route('/:id').get(auth, getCompanyProfile);

module.exports = router;
