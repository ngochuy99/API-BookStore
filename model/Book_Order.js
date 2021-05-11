var db = require("../model");
var Book = db.Book;
var Order = db.Order;
module.exports = function(sequelize,Sequelize){
    var Book_Order = sequelize.define("Book_Order",{
            BookId: {
              type: Sequelize.INTEGER,
              references: {
                model: Book, // 'Movies' would also work
                key: 'id'
              }
            },
            OrderId: {
              type: Sequelize.INTEGER,
              references: {
                model: Order, // 'Actors' would also work
                key: 'id'
              }
            },
            quantity:{
                type: Sequelize.INTEGER,
                allowNull:false
            }
    })
    return Book_Order;
}