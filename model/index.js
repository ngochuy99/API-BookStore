"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = require(path.join(__dirname, file))(sequelize,Sequelize.DataTypes);
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
//Association
//define var
db.User = require('./User')(sequelize,Sequelize);
db.Account = require('./Account')(sequelize,Sequelize);
db.Author = require("./Author")(sequelize,Sequelize);
db.Publisher = require("./Publisher")(sequelize,Sequelize);
db.Category = require("./Category")(sequelize,Sequelize);
db.Book = require("./Book")(sequelize,Sequelize);
//User-Account 1-1
db.User.hasOne(db.Account);
db.Account.belongsTo(db.User);

//Book - Author n-1
db.Author.hasMany(db.Book);
db.Book.belongsTo(db.Author);

//Book - Publisher n-1
db.Publisher.hasMany(db.Book);
db.Book.belongsTo(db.Publisher);

//Book - Category n-n
db.Book.belongsToMany(db.Category,{ through : "Book_Category",unique:false});
db.Category.belongsToMany(db.Book,{ through : "Book_Category",unique:false});


module.exports = db;