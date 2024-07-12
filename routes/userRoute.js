const express = require('express');

const router = express.Router();

const { userProfile, userImage } = require('../controllers/user.controller');


router.get('/profile',userProfile);
router.get('/user/profile/:fileName', userImage);


module.exports = router;