var express = require('express');
var router = express.Router();
var model = require("../model");
var Book = model.Book;
var Author = model.Author;
var Publisher = model.Publisher;
var Category = model.Category;
const { Op } = require("sequelize");

router.post("/",async function(req,res){
    try {
        const {name,inStock,price,description,author_firstname,author_lastname,publisher_name,category_list} = req.body;
        var categories = [];
        //Get foreign key id
        var author = await Author.findOne({
            [Op.and]: 
            [{ firstname: author_firstname }, { lastname: author_lastname }]
        });
        var publisher = await Publisher.findOne({
            where:{
                name:publisher_name
            }
        });
        for(index in category_list){
            var category = await Category.findOne({
                where:{
                    name:category_list[index]
                }
            });
            categories.push(category);
        }
        //Check validation for foregin key
        if(author==null||publisher==null){
            res.send("author or publisher not found");
        }
        else{
            var book = await Book.build({
                name:name,
                inStock:inStock,
                price:price,
                description:description,
                AuthorId:author.id,
                PublisherId:publisher.id
            });
            await book.save();
            book.addCategories(categories);
            res.status(200).send("Create book success");
        }
    } catch (err) {
        returnError(res,err)
    }
})

router.get("/",async function(req,res){
    try {
        var books = await Book.findAll({
            attributes:{exclude:["createdAt","updatedAt"]},
            include:[Author,Category,Publisher]
        })
        res.status(200).json({
            books:books
        })
    } catch (err) {
        returnError(res,err);
    }
})

router.get("/:id",async function(req,res){
    try {
        var books = await Book.findOne({
            attributes:{exclude:["createdAt","updatedAt"]},
            include:[Author,Category,Publisher],
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({
            books:books
        })
    } catch (err) {
        returnError(res,err);
    }
})

router.put("/:id",async function(req,res){
    try {
        const {name,inStock,price,description,author_firstname,author_lastname,publisher_name,category_list} = req.body;
        var categories = [];
        //Get foreign key id
        var author = await Author.findOne({
            [Op.and]: 
            [{ firstname: author_firstname }, { lastname: author_lastname }]
        });
        var publisher = await Publisher.findOne({
            where:{
                name:publisher_name
            }
        });
        for(index in category_list){
            var category = await Category.findOne({
                where:{
                    name:category_list[index]
                }
            });
            categories.push(category);
        }
        //Check validation for foregin key
        if(author==null||publisher==null){
            res.send("author or publisher not found");
        }
        else{
            await Book.update({
                name:name,
                inStock:inStock,
                price:price,
                description:description,
                AuthorId:author.id,
                PublisherId:publisher.id
            },{
                where:{
                    id:req.params.id
                }
            });
            var book = await Book.findOne({
                where:{
                    id:req.params.id
                }
            });
            book.setCategories(categories);
            res.status(200).send("Update book "+req.params.id+" success");
        }
    } catch (err) {
        returnError(res,err)
    }
})

router.delete("/:id",async function(req,res){
    try {
        await Book.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Delete Book id "+req.params.id+" success");
    } catch (err) {
        returnError(req,err);
    }
})

let returnError = function(res,err){
    res.status(500).json({
        message:err
    })
    throw err;
}

module.exports = router;