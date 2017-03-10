var CustomerDAO=require('../dao/CustomerDAO');
exports.addCustomer=function (customer,callback) {
    return CustomerDAO.addCustomer(customer,callback);
};
exports.deleteCustomer=function (customerId,callback) {
    return CustomerDAO.deleteCustomer(customerId,callback);
};
exports.updateCustomer=function (customer,callback) {
    return CustomerDAO.updateCustomer(customer,callback);
};
exports.searchCustomer=function (customerId) {
    
};
exports.allCustomer=function (callback) {
    return CustomerDAO.allCustomer(callback);
};

