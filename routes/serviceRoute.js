const express = require('express');
const { services } = require('../controllers/service.controller');

const router = express.Router();

 



router.get('/availableServices',services);



module.exports = router;                             

