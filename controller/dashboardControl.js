const { response } = require('express');

const dashboard = require('../models/dashboardModel');


exports.addFile = async(req , res)=>{
    const {name , id , userName} = req.body;
    try{
        const result = await dashboard.create({
            name:name,
            id:id,
            userName:userName
        });

        res.json({code:1 , message:'File added to dashboard'});
    }
    catch(err){
        res.json({code:-1 , message:'Error in adding file to dashboard'});
    }
}

exports.getFiles = async(req , res)=>{
    try{
        const result = await dashboard.find({},{userName:1 , name:1 , id:1 , _id:0});
        if(result)
            res.json({code:1 , files:result , message:'Files fetched successfully'});
        else{
            res.json({code:-1 , message:'Failed to fetch files'});
        }
    }catch(err){
        res.json({code:-1 , message:'Failed to fetch files'});
    }
}