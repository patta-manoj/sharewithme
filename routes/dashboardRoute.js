const express = require('express');

const router = express.Router();

const controller = require('../controller/dashboardControl')

router.post('/' , controller.addFile);

router.get('/' , controller.getFiles);


module.exports = router ;