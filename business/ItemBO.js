var ItemDAO=require('../dao/ItemDAO');
exports.addItem=function (item,callback) {
    return ItemDAO.addItem(item,callback);
};
exports.deleteItem=function (itemId,callback) {
    return ItemDAO.deleteItem(itemId,callback);
};
exports.updateItem=function (item,callback) {
    return ItemDAO.updateItem(item,callback);
};
exports.searchItem=function (itemId) {
    
};
exports.allItem=function (callback) {
    return ItemDAO.allItem(callback);
};


