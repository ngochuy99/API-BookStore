var express = require('express');
const { Op } = require('sequelize');
var jwt = require('../middleware/jwt');
var router = express.Router();
var model = require('../model');
var bcrypt = require('bcrypt');
var Account = model.Account;
router.post('/',async function(req,res){
    var acc = await Account.findOne({
        where:{
            username:req.body.username
        }
    });
    if(acc !=null&&bcrypt.compareSync(req.body.password,acc.password)){
        var user = await acc.getUser();
        // var token = await jwt.generateToken(user,process.env.secretkey,process.env.tokenLife);
        res.status(200).json({
            user:user
        });
    }
    else{
        res.status(500).json({
            message:"Username or password incorrect"
        });
    }
})

module.exports = router;