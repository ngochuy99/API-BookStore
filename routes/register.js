var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var model = require('../model');
const Account = model.Account;
const User = model.User;

router.post('/',function(req,res){
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            throw err;
        }
        bcrypt.hash(req.body.password,salt,async function(err,encrypted){
            if(err){
                throw err;
            }
            else{
                try {
                    const {firstname,lastname,address,tel,gender,email,username} = req.body;
                    const user = User.build({
                        firstname: firstname,
                        lastname: lastname,
                        address: address,
                        tel: tel,
                        gender: gender,
                        email: email,
                    })
                    await user.save();
                    const acc = Account.build({
                        username:username,
                        password:encrypted,
                        UserId:user.id
                    });
                    await acc.save();
                    res.status(200).json({
                        message:"Register success"
                    });
                } catch (error) {
                    res.status(500).json({
                        message:error
                    })
                    throw error;
                }
                
            }
        })
    })
})
module.exports = router;