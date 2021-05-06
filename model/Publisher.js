module.exports = function(sequelize,Sequelize){
    var Publisher = sequelize.define("Publisher",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        address:{
            type:Sequelize.STRING,
            allowNull:true
        }
    },{
        timestamps:false
    })
    return Publisher;
}