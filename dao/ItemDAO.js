var connectionFactory=require('./ConnectionFactory');
var mysql=require('mysql');
exports.addItem = function (item, callback) {
    var connection = connectionFactory.getConnection();
    var sql = "INSERT INTO item VALUES(?,?,?,?)";
    var params = [item.getId(),
        item.getName(),
        item.getPrice(),
        item.getQtyOnHand()
    ];
    sql = mysql.format(sql, params);
    connection.query(sql, function (err, result, fileds) {
        if (err) {
            console.log(err.message);
            callback(false);
        }
        callback(result.affectedRows > 0);
    });
};

exports.deleteItem = function (itemId, callback) {
    var connection = connectionFactory.getConnection();
    var sql = "DELETE FROM item WHERE code = ?";
    sql = mysql.format(sql, itemId);
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err.message);
            callback(false);
        }
        callback(result.affectedRows > 0);
    });
    //console.log(itemId);
};

exports.updateItem = function (item,callback) {
    var connection = connectionFactory.getConnection();
    var sql = "UPDATE item SET description=?,unitPrice=?,qtyOnHand=? WHERE code=?";
    var params = [
        item.getName(),
        item.getPrice(),
        item.getQtyOnHand(),
        item.getId()
    ];
    sql = mysql.format(sql, params);
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err.message);
            callback(false);
        }
        callback(result.affectedRows > 0);
    });
    //console.log(itemId);
};

exports.searchItem = function () {

};
exports.allItem=function (callback) {
    var connection=connectionFactory.getConnection();
    var sql="SELECT * FROM item";
    connection.query(sql,function (err,results,fields) {
        if(err){
            console.log("cannot get data\n"+err.message);
            callback(false);
        }
        callback(results);    
    });
    
};
