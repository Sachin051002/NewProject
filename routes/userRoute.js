const express = require('express');

const router = express.Router();

const { userProfile, updateProfile } = require('../controllers/user.controller');
const { userUpload } = require('../middleware/multer');



router.get('/profile',userProfile);
router.post('/updateProfile',userUpload, updateProfile);



module.exports = router;