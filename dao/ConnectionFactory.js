var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ijse',
    database:'company'
});
connection.connect(function (err) {
    if(err){
        console.log(err.message);
        return ;
    }
    console.log("Connection has been successfully established...");
});

exports.getConnection=function() {
    return connection;
};