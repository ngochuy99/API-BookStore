var express = require('express');
const { route } = require('./register');
var model = require("../model");
var Publisher  = model.Publisher;
var router = express.Router();

router.post("/",async function(req,res){
    try {
        const {name,address} = req.body;
        const publisher = Publisher.build({
            name:name,
            address:address
        });
        await publisher.save();
        res.status(200).send("Create Publisher success");
    } catch (err) {
        returnError(res,err);
    }
})

router.get("/",async function(req,res){
    try {
        var publisherList = await Publisher.findAll();
        if(publisherList!=null){
            res.status(200).json({
                publisher: publisherList
            });
        }
        else{
            res.status(404).json({
                message:"No publisher Found"
            });
        }
    } catch (err) {
        returnError(res,err);
    }
})

router.get('/:id',async function(req,res){
    try {
        var publisher = await Publisher.findOne({
            where:{
                id:req.params.id
            }
        });
        if(publisher !=null){
            res.status(200).json({
                publisher: publisher
            })
        }
        else{
            res.json({
                message:"no Publisher with id "+req.params.id+" found"
            })
        }
    } catch (err) {
        returnError(res,err);
    }
})

router.put("/:id",async function(req,res){
    try {
        const {name,address} = req.body;
        await Publisher.update({
            name:name,
            address:address,
        },{
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Update Publisher id: "+req.params.id+" success");
    } catch (err) {
        returnError(res,err);
        
    }
})

router.delete("/:id",async function(req,res){
    try {
        await Publisher.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Remove Publisher id: "+req.params.id+" success");
    } catch (err) {
        returnError(res,err);
    }
})
let returnError = function(res,err){
    res.status(500).json({
        message:err
    })
    throw err;
}
module.exports = router;