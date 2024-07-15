const express = require('express');

const router = express.Router();

const { userProfile } = require('../controllers/user.controller');


router.get('/profile',userProfile);


module.exports = router;