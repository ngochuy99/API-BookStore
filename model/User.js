module.exports = function(sequelize,Sequelize){
    var User = sequelize.define('User',{
        id:{
            autoIncrement: true,
            primaryKey:true,
            type : Sequelize.INTEGER
        },
        role:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        firstname:{
            type: Sequelize.STRING,
            allowNull:false
        },
        lastname:{
            type:Sequelize.STRING,
            allowNull:false
        },
        address:{
            type:Sequelize.STRING,
            allowNull:false
        },
        tel:{
            type:Sequelize.STRING,
            allowNull:true
        },
        gender:{
            type:Sequelize.ENUM('male','female'),
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:true
        }
    },{
        timestamps:false
    });
    return User;
}