module.exports = function(sequelize,Sequelize){
    var Order = sequelize.define("Order",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        destination:{
            type:Sequelize.STRING,
            allowNull:false
        },
        shipmentFee:{
            type:Sequelize.DOUBLE,
            allowNull:false
        }
    })
    return Order;
}