var express = require('express');
var router = express.Router();
var model = require("../model");
var Author = model.Author;


router.get("/",async function(req,res){
    try {
        var authorlist = await Author.findAll();
        if(authorlist != null){
            res.status(200).json({
                author : authorlist
            });
        }else{
            res.status(404).json({
                message:"No author Found"
            });
        }
    } catch (err) {
        returnError(res,err);
    }
})

router.get("/:id",async function(req,res){
    try{
        var author = await Author.findOne({
            where:{
                id:req.params.id
            }
        })
        if(author !=null){
            res.status(200).json({
                author:author
            })
        }
        else{
            res.json({
                message:"no Author with id "+req.params.id+" found"
            })
        }
    }   catch(err){
        returnError(res,err);
    }
})

router.post("/",async function(req,res){
    try {
        const {firstname,lastname,dob} = req.body;
        const author = Author.build({  
            firstname:firstname,
            lastname:lastname,
            dob:dob
        })
        await author.save();
        res.status(200).send("Create author success");
    } catch (err) {
        returnError(res,err);
    }
})

router.put("/:id",async function(req,res){
    try {
        const {firstname,lastname,dob} = req.body;
        await Author.update({
            firstname:firstname,
            lastname:lastname,
            dob:dob
        },{
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Update author id: "+req.params.id+" success");
    } catch (err) {
        returnError(res,err);
        
    }
})

router.delete("/:id",async function(req,res){
    try {
        await Author.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Remove Author id: "+req.params.id+" success");
    } catch (err) {
        returnError(res,err);
    }
})
// router.delete("/",async function(req,res){
//     try {
//         await Author.destroy();
//         res.status(200).send("Remove Author success");
//     } catch (err) {
//         returnError(res,err);
//     }
// })

let returnError = function(res,err){
    res.status(500).json({
        message:err
    })
    throw err;
}
module.exports = router;