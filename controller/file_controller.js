const { response } = require('express');

const User = require('../models/schema');
const bcrypt = require('bcrypt');


const saltRounds = 10;

const hashPassword = async (userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
        });
    });
};


exports.addFile = async (req, res) => {
    const { id, name, uri, secured, password } = req.body;

    try {
        let hashedPassword;

        if (secured) {
            hashedPassword = await hashPassword(password);
        }

        const result = await User.create({
            id: id,
            name: name,
            uri: uri,
            protected: secured,
            password: hashedPassword || password,
        });

        res.status(200).json({ code: 1, message: 'File uploaded successfully' });

    } catch (err) {
            console.log(err);
            res.status(400).json({ code: -1, message: 'Failed to upload' });
        }
};


exports.getFile = async(req , res)=>{
    const id = req.params.id;
    try{
        const result = await User.findOne(
            {id:id}
        );
        if(result){
            if(!result.protected){
                res.json({code:1 , uri:result.uri ,message:'File Found'}) ;
            }
            else{
                res.json({code:5 , message:'File is password protected'});
            }
        }
        else{
            res.json({code:0 , message:'File not found'});
        }
    }
    catch(err){
        res.json({code:-1 , message:'Error in getting file'});
    }
}