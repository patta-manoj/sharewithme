const express = require('express');
const router = express.Router();

const controller = require('../controller/authenticateFilePassword');

router.post('/' , controller.validatePassword);

module.exports = router ;