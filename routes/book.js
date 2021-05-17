var express = require('express');
var router = express.Router();
var model = require("../model");
var Book = model.Book;
var Author = model.Author;
var Publisher = model.Publisher;
var Category = model.Category;
var fs = require('fs');
const base64 = require('node-base64-image');
const { Op } = require("sequelize");
const { Console } = require('console');

router.post("/",async function(req,res){
    try {
        const {name,inStock,price,description,author_firstname,author_lastname,publisher_name,category_list,image} = req.body;
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
                PublisherId:publisher.id,
                Image:image
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
        for(index in books){
            var filepath = books[index].Image;
            const image = fs.readFileSync(filepath, { encoding: 'base64' });
            books[index].Image = image;
        }
        res.status(200).json({
            books:books
        })
    } catch (err) {
        returnError(res,err);
    }
})

router.get("/:id",async function(req,res){
    try {
        var book = await Book.findOne({
            attributes:{exclude:["createdAt","updatedAt"]},
            include:[Author,Category,Publisher],
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({
            book:book
        })
    } catch (err) {
        returnError(res,err);
    }
})

router.put("/:id",async function(req,res){
    try {
        const {name,inStock,price,description,author_firstname,author_lastname,publisher_name,category_list,image} = req.body;
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
            var book = await Book.findOne({
                where:{
                    id:req.params.id
                }
            });
            await Book.update({
                name:name,
                inStock:inStock,
                price:price,
                description:description,
                AuthorId:author.id,
                PublisherId:publisher.id,
                Image:image
            },{
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
        var book = await Book.findOne({
            where:{
                id:req.params.id
            }
        });
        await Book.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Delete Book id "+req.params.id+" success");
    } catch (err) {
        returnError(res,err);
    }
})

router.get('/test/image',async function(req,res){
    try {
        saveImageFromBase64(req.image,"asdw");
        console.log(process.cwd()+"/public/images/");
        res.send("OK");
    } catch (err) {
        returnError(res,err);
    }
})

router.delete("/",async function(req,res){
    try {
        await Book.destroy({
            truncate: true
        });
        res.send("Delete all book!");
    } catch (err) {
        returnError(res,err)
    }
})

let returnError = function(res,err){
    res.status(500).json({
        message:err
    })
    throw err;
}

let saveImageFromBase64 = async function(Base64Image,filename){
    console.log(__dirname);
    fs.writeFile(filename+".png",Base64Image,'base64',function(err){
        if(err){
            console.log(err);
            throw err;
        }
    })
}

module.exports = router;