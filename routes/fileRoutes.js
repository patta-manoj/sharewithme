const express = require('express');

const router = express.Router();

const controller = require('../controller/file_controller');


router.get('/:id' , controller.getFile);


router.post('/' , controller.addFile);


module.exports = router ;