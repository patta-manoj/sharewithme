const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');


const User = require('../models/schema');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function validatePassword(req , res){
    const {id , password } = req.body;
    try{
        const user = await User.findOne(
            {id:id}
        );
        if(user){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                res.json({code:-10 , message:"Invalid password"});
                return;
            }
            return res.json({code:1 , uri:user.uri , message:"File retrieved successfully"});
        }
        else{
            res.json({code:0 , message:'File not found'});
            return;
        }
    }
    catch(err){
        res.json({code:-1 , message:'Something went wrong'});
    }
}

module.exports = { validatePassword };