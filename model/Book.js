module.exports = function(sequelize,Sequelize){
    var Book = sequelize.define("Book",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        inStock:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        price:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Image:{
            type:Sequelize.STRING,
            allowNull:true
        }
    })
    return Book;
}