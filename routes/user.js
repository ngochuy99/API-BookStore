var express = require('express');
var router = express.Router();
var model = require('../model');
const Account = model.Account;
const User = model.User;

router.get('/',async function(req,res){
    try {
        const users = await User.findAll();
        res.status(200).json({
            users:users
        })
    } catch (error) {   
        res.status(500).json({
            message:error
        })
    }
})

router.put('/',function(req,res){       //bulk update
    res.status(405).send("Method not allowed");
});

router.delete('/',async function(req,res){    //bulk delete
    try {
        await User.destroy();
        res.status(200).send("remove all user success");
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/:id',async function(req,res){
    try {
        var user = await User.findByPk(req.params.id);
        if(user){
            res.status(200).json({
                user:user
            })
        }
        else{
            res.status(404).json({
                message:"no user found"
            });
        }
    } catch (err) {
        res.status(500).send(err);
        throw err;
    }
})

router.put("/:id",async function(req,res){
    try {
        const {firstname,lastname,address,tel,gender,email} = req.body;
        await User.update({
            firstname: firstname,
            lastname: lastname,
            address: address,
            tel: tel,
            gender: gender,
            email: email
        },{
            where:{
                id:req.params.id
            }
        })
        res.status(200).send("Update user " + req.params.id + " success!");
    } catch (err) {
        res.status(500).send(err);
        throw err;
    }
})

router.delete("/:id",async function(req,res){
    try {
        await Account.destroy({
            where:{
                UserId:req.params.id
            }
        })
        await User.destroy({
            where:{
                id:req.params.id
            }
        });
        
        res.status(200).send("Destroy user " + req.params.id + " success");
    } catch (err) {
        res.status(500).send(err);
        throw err;
    }
})
module.exports = router;