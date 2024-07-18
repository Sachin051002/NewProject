const express = require('express');
const { services } = require('../controllers/service.controller');

const router = express.Router();





router.get('/services',services);



module.exports = router;