var connectionFactory = require('./ConnectionFactory');
var mysql = require('mysql');
exports.addOrderDetail = function (orderDetails, callback) {
    var connection = connectionFactory.getConnection();
    var affectedRow = 0;
   
    var orderDetail;
    var sql;
    var params;
    for (var i in orderDetails) {
        orderDetail = orderDetails[i];
        sql="INSERT INTO orderdetail VALUES(?,?,?,?)";
        params = new Array(orderDetail.getId(),
            orderDetail.getItemCode(),
            orderDetail.getQty(),
            orderDetail.getUnitPrice()
        );
        sql = mysql.format(sql, params);
        connection.query(sql, function (err, result, fileds) {
            if (err) {
                 console.log(err.message);
                callback(false);
            }
            affectedRow += parseInt(result.affectedRows);
            if(affectedRow===(parseInt(orderDetails.length))){
                callback(affectedRow > 0);
            }
            
        });
        

    }
    
};
exports.allOrderDetail = function (id, callback) {
    var connection = connectionFactory.getConnection();
    var sql = "SELECT OrderDetail.*, item.description FROM orderDetail INNER JOIN item ON orderDetail.itemCode=item.code WHERE orderId = '" + id + "' ";
    connection.query(sql, function (err, results, fields) {
        if (err) {
//            console.log("cannot get data\n" + err.message);
            callback(false);
        }
        callback(results);
    });
};
