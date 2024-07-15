const express = require('express');

const router = express.Router();

const { login, register, userImage } = require('../controllers/auth.controller')
const { userUpload } = require('../middleware/multer');


router.post('/login', login);
router.post('/register', userUpload, register);
router.get('/getImages/:fileName', userImage);


module.exports = router;