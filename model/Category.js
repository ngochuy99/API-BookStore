module.exports = function(sequelize,Sequelize){
    var Category = sequelize.define("Category",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        }
    },{
        timestamps:false
    })
    return Category;
}