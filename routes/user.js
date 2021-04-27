var express = require('express');
var router = express.Router();
var model = require('../model');
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

module.exports = router;