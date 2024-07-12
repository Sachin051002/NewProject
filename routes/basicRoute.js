const express = require('express');

const router = express.Router();

const {login,register} = require('../controllers/auth.controller')
const {userUpload} = require('../middleware/multer');


router.post('/login',login);
router.post('/register',userUpload,register);


module.exports = router;