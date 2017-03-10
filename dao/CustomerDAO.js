var connectionFactory=require('./ConnectionFactory');
var mysql=require('mysql');
exports.addCustomer=function (customer,callback) {
    var connection=connectionFactory.getConnection();
    var sql="INSERT INTO Customer VALUES(?,?,?,?)";
    var params=[customer.getId(),
                customer.getName(),
                customer.getAddress(),
                customer.getSalary()        
            ];
    sql=mysql.format(sql,params);
    connection.query(sql,function (err,result,fileds) {
        if(err){
            console.log(err.message);
            callback(false) ;
        }
        callback(result.affectedRows>0);
    });
    console.log(customer);
};
exports.deleteCustomer=function (customerId,callback) {
    var connection=connectionFactory.getConnection();
    var sql="DELETE FROM Customer WHERE id = ?";
    
    sql=mysql.format(sql,customerId);
    connection.query(sql,function (err,result,fileds) {
        if(err){
            console.log(err.message);
            callback(false) ;
        }
        callback(result.affectedRows>0);
    });
    console.log(customerId);
};
exports.updateCustomer=function (customer) {
    var connection=connectionFactory.getConnection();
    var sql="UPDATE Customer SET name = ?, address = ?, salary = ? WHERE id = ?";
    
    var params=[customer.getName(),customer.getAddress(),customer.getSalary(),customer.getId()];
    
    sql=mysql.format(sql,params);
     console.log(sql);
    connection.query(sql,function (err,result,fields){
        if(err){
            console.log(err.message);
            callback(false);
            return ;
        }
        callback(result.affectedRows>0);
        console.log(result.affectedRows>0);
        console.log("update ela");
    });
};
exports.searchCustomer=function (customerId) {
    
};
exports.allCustomer=function (callback) {
    var connection=connectionFactory.getConnection();
    var sql="SELECT * FROM Customer";
    connection.query(sql,function (err,results,fields) {
        if(err){
            console.log("cannot get data\n"+err.message);
            callback(false);
        }
        callback(results);    
    });
    
};
