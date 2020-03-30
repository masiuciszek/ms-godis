const express = require('express');
const auth = require('../middlewares/authHandler');
const role = require('../middlewares/roleHandler');
const { getCandies } = require('../controllers/candies.controller');

const router = express.Router();

router.route('/').get(auth, getCandies);

module.exports = router;
