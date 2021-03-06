var express = require('express');
var router = express.Router();
var model = require('../model');
var Category = model.Category;

router.post("/",async function(req,res){
    try {
        const {name} = req.body;
        const category = Category.build({
            name:name,
        });
        await category.save();
        res.status(200).send("Create Category success");
    } catch (err) {
        returnError(res,err);
    }
})

router.get("/",async function(req,res){
    try {
        var CategoryList = await Category.findAll();
        if(CategoryList!=null){
            res.status(200).json({
                category: CategoryList
            });
        }
        else{
            res.status(404).json({
                message:"No category Found"
            });
        }
    } catch (err) {
        returnError(res,err);
    }
})

router.get('/:id',async function(req,res){
    try {
        var category = await Category.findOne({
            where:{
                id:req.params.id
            }
        });
        if(category !=null){
            res.status(200).json({
                category: category
            })
        }
        else{
            res.json({
                message:"no Category with id "+req.params.id+" found"
            })
        }
    } catch (err) {
        returnError(res,err);
    }
})

router.put("/:id",async function(req,res){
    try {
        const {name,address} = req.body;
        await Category.update({
            name:name,
        },{
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Update Category id: "+req.params.id+" success");
    } catch (err) {
        returnError(res,err);
        
    }
})

router.delete("/:id",async function(req,res){
    try {
        await Category.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Remove Category id: "+req.params.id+" success");
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