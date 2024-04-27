const { response } = require('express');

exports.isDB_Connected = async(req , res) =>{
    res.json({isConnected:1});
}