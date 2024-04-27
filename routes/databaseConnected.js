const express = require('express');

const router = express.Router();

const controller = require('../controller/databaseConnected');

router.get('/' , controller.isDB_Connected);

module.exports = router ;