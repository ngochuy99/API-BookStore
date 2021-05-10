module.exports = function(sequelize,Sequelize){
    var Order = sequelize.define("Order",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        total:{
            type:Sequelize.DOUBLE,
            allowNull:true
        },
        destination:{
            type:Sequelize.STRING,
            allowNull:false
        },
        quantity:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        shipmentFee:{
            type:Sequelize.DOUBLE,
            allowNull:false
        }
    })
    return Order;
}