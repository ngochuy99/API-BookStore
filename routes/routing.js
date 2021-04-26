var express = require('express');
var router = express.Router();
var index = require('./index');
var users = require('./users');
router.get('/index',function(req,res,next){
    res.render('index', { title: 'Express' });
})
router.get('/users',users);

module.exports = router;