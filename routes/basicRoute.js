const express = require('express');

const router = express.Router();

const { login, register, userImage, verify } = require('../controllers/auth.controller')
const { userUpload } = require('../middleware/multer');


router.post('/login', login);
router.post('/register', userUpload, register);
router.post('/verify',verify);
router.get('/getImages/:fileName', userImage);


module.exports = router;