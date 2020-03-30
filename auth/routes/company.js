const express = require('express');
const auth = require('../middlewares/authHandler');
const role = require('../middlewares/roleHandler');
const { getCompanyProfile } = require('../controllers/company.controller');

const router = express.Router();

router.route('/:id').get(auth, getCompanyProfile);

module.exports = router;
