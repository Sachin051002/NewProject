const express = require('express');

const router = express.Router();

const { login, register, userImage, verify, getOtp } = require('../controllers/auth.controller')
const { userUpload } = require('../middleware/multer');
const { captcha, captcha2, captchaVerify } = require('../controllers/captcha.controlle');


//Auth controller file
router.post('/login', login);
router.get('/hello',(req,res)=>{
    res.send('slfjlksjdf')
})
router.post('/register', userUpload, register);
router.post('/verify',verify);
router.get('/getImages/:fileName', userImage);
router.post('/getOtp', getOtp)

// captcha controller
router.get('/captcha',captcha)
router.post('/verifyCaptcha',captchaVerify)


module.exports = router;