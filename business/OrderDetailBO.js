var OrderDetailDAO=require('../dao/OrderDetailDAO');
exports.addOrder=function (orderDtail,callback) {
    return OrderDetailDAO.addOrderDetail(orderDtail,callback);
};
exports.allOrderDetail = function (id,callback){
    return OrderDetailDAO.allOrderDetail(id,callback);
};
   
    
