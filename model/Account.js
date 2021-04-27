
module.exports = function(sequelize,Sequelize){
    var Account = sequelize.define('Account',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
        }
    },{
        timestamps:false
    });
    return Account;
}