var connectionFactory=require('./ConnectionFactory');
var mysql=require('mysql');
exports.addOrder=function (order,callback) {
    var connection=connectionFactory.getConnection();
    var sql="INSERT INTO Orders VALUES(?,?,?)";  
    var params=[order.id,order.date,order.custId];
    sql=mysql.format(sql,params);
    connection.query(sql,function (err,result,fileds) {
        if(err){
            console.log(err.message);
            callback(false) ;
        }
        console.log(result.affectedRows>0);
        callback(result.affectedRows>0,order.id);
    });
    console.log(sql);
    
};
exports.deleteOrder=function (itemId,callback) {
    var connection=connectionFactory.getConnection();
    var sql="DELETE FROM item WHERE code = ?";    
    
};
exports.updateOrder=function (item) {
    
};
//exports.searchOrder=function (itemId) {
//    
//};
exports.allOrder=function (callback) {
    var connection=connectionFactory.getConnection();
    var sql="SELECT Orders.*, Customer.name FROM Orders INNER JOIN Customer ON orders.customerId=Customer.id";
    connection.query(sql,function (err,results,fields) {
        console.log(results);
        if(err){
//            console.log("cannot get data\n"+err.message);
            callback(false);
        }
        
        callback(results);    
    });
    
    
};
exports.onlyAllOrder=function (callback) {
    var connection=connectionFactory.getConnection();
    var sql="select * from orders";
    connection.query(sql,function (err,results,fields) {
        //console.log(results);
        if(err){
//            console.log("cannot get data\n"+err.message);
            callback(false);
        }
        
        callback(results);    
    });
    
    
};
