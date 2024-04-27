const mongoose = require('mongoose');

const dashboardModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    id:{
        type: String,
        required: true,
        unique: true
    },
    userName:{
        type: String,
        required: true,
    }
});

const dashboard = new mongoose.model('Dashboard_P4' , dashboardModel);

module.exports = dashboard ;