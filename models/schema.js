const mongoose = require('mongoose');

const model = new mongoose.Schema(
    {
        id:{
            type: String,
            required: true,
            unique: true,
        },
        name:{
            type: String,
            required: true,
        },
        uri:{
            type: String,
            required: true,
        },
        protected:{
            type:Boolean,
            required:true,
            default: false,
        },
        password:{
            type:String,
            default:''
        }
    }
);

const user = new mongoose.model('UserFiles_P4', model);

module.exports = user ;