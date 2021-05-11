var express = require("express");
const db = require("../model");
var router = express.Router();
var Order = db.Order;
var Book = db.Book;
var User = db.User;
var Book_Order = db.Book_Order;

router.get("/", async function(req,res){   //get all
    try {
        var orders = await Order.findAll({
            include:[Book,User]
        });
        for(order_index in orders){
            var total = 0;
            for(book_index in orders[order_index].Books){
                total+=orders[order_index].Books[book_index].price *orders[order_index].Books[book_index].Book_Order.quantity;
            }
            orders[order_index].setDataValue("total",total);
        }
        res.status(200).json({
            orders:orders
        })
    } catch (err) {
        returnError(res,err);
    }

})

router.get("/:id",async function(req,res){    //get by id
    try {
        var order = await Order.findOne({
            where:{
                id:req.params.id
            },
            include:[Book,User]
        });
            var total = 0;
            for(book_index in order.Books){
                total+=order.Books[book_index].price *order.Books[book_index].Book_Order.quantity;
            }
            order.setDataValue("total",total);
        res.status(200).json({
            order:order
        });
    } catch (err) {
        returnError(res,err);
    }
})

router.post("/",async function(req,res){     //create new order
    try {
        const {destination,shipmentFee,books,userId} = req.body; //define const
        var order = await Order.create({                    //Create order
            destination:destination,
            shipmentFee:shipmentFee,
            UserId:userId
        });                                        
        var book_order = [];                             //args for bulkCreate
        for(index in books){
            book_order.push({
                BookId:books[index].book,
                OrderId:order.id,
                quantity:books[index].quantity
            });
        }
        await Book_Order.bulkCreate(book_order);
        for(index in book_order){
            var book = await Book.findOne({
                where:{
                    id:book_order[index].BookId
                }
            });
            await book.decrement('inStock',{by:book_order[index].quantity});
        }
        res.status(200).send("create order success");
    } catch (err) {
        returnError(res,err);
    }
})



router.put("/:id",async function(req,res){   //update by id
    try {
        const {destination,shipmentFee,books,userId} = req.body; //define const
        var order = await Order.findOne({
            where:{
                id:req.params.id
            },
            include:Book
        });
        await Order.update({                    //Update order
            destination:destination,
            shipmentFee:shipmentFee,
            UserId:userId
        },{
            where:{
                id:req.params.id
            }
        });          
        
        for(var index in order.Books){
            var bookinBooks = await Book.findOne({
                where:{
                    id:order.Books[index].Book_Order.BookId
                }
            });
            await bookinBooks.increment('inStock',{by:order.Books[index].Book_Order.quantity});
        }
        var book_order = [];                             //args for bulkCreate
        for(index in books){
            book_order.push({
                BookId:books[index].book,
                OrderId:order.id,
                quantity:books[index].quantity
            });
        }
        Book_Order.destroy({
                where:{
                    OrderId:req.params.id
                }
        });
        for(index in book_order){
            var book = await Book.findOne({
                where:{
                    id:book_order[index].BookId
                }
            });
            await book.decrement('inStock',{by:book_order[index].quantity});
        }
        await Book_Order.bulkCreate(book_order);
        res.status(200).send("Update order id "+req.params.id +" success"); 
    } catch (err) {
        returnError(res,err);
    }
})

router.delete("/:id",async function(req,res){     //delete by id
    try {
        await Order.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Delete order ID: "+req.params.id+" success");
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