module.exports = function(sequelize,Sequelize){
    var Author = sequelize.define("Author",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        firstname:{
            type:Sequelize.STRING,
            allowNull:true
        },
        lastname:{
            type:Sequelize.STRING,
            allowNull:true
        },
        dob:{
            type:Sequelize.DATEONLY,
            allowNull:true
        },
    },{
        timestamps:false
    })
    return Author;
}