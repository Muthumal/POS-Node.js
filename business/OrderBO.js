var OrderDAO=require('../dao/OrderDAO');
exports.addOrder=function (order,callback) {
    var lastId="";
    var orderId="";
    OrderDAO.onlyAllOrder(function (result) {
        lastId=result[result.length-1].id;
        console.log("hi lm   "+lastId);
        var num=parseInt(lastId.substring(1))+1;
        if(num<10){
            orderId="D00"+num;
        }else if(num<100){
            orderId="D0"+num;
        }else{
            orderId="D"+num;
        }
        var now=Date.now();
        var date = new Date(now);
        order.customer.date=date;
        order.customer.id=orderId;
        console.log(orderId+"  "+order.customer.custId+"  "+date);
        return OrderDAO.addOrder(order.customer,callback);
    });
   
    //return ;
};
exports.deleteOrder=function (orderId,callback) {
//    return ItemDAO.deleteItem(orderId,callback);
};
exports.updateOrder=function (order) {
    
};
exports.searchOrder=function (orderId) {
    
};
exports.allOrder = function (callback){
    return OrderDAO.allOrder(callback);
};


