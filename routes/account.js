var express = require('express');
var router = express.Router();
var model = require("../model");
var bcrypt = require("bcrypt");
var Account = model.Account;

router.get("/",async function(req,res){
    try {
        var acc = await Account.findAll();
        if(acc){
            res.status(200).json({
                account:acc
            })
        }
        else{
            res.status(404).send("no account found");
        }
    } catch (err) {
        res.status(500).send(err);
        throw err;
    }
})

router.put("/:Userid",async function(req,res){
    try {
        if(req.body.username&&req.body.password){
            bcrypt.genSalt(10,function(err,salt){
                if(err) throw err;
                bcrypt.hash(req.body.password,salt,async function(err,encrypted){
                    if(err) throw err;
                    await Account.update({
                        username:req.body.username,
                        password:encrypted,
                    },{
                        where:{
                            UserId:req.params.Userid
                        }
                    });
                    res.status(200).send("Update password success");
                });
            });
        }
        else{
            res.status(400).send("Missing Parameters");
        }
    } catch (err) {
        res.status(500).send(err);
        throw err;
    }
})



module.exports = router