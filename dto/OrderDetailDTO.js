function OrderDetailDTO(id, itemCode, qty, unitPrice) {
    var _id = id;
    var _itemCode = itemCode;
    var _qty = qty;
    var _unitPrice = unitPrice;

    this.getId = function () {
        return _id;
    };
    this.getItemCode = function () {
        return _itemCode;
    };
    this.getQty = function () {
        return _qty;
    };
    this.getUnitPrice = function () {
        return _unitPrice;
    };


    this.setId = function (id) {
        _id = id;
    };
    this.setItemCode = function (itemCode) {
        _itemCode = itemCode;
    };
    this.setQty = function (qty) {
        _qty = qty;
    };
    this.setUnitPrice = function (unitPrice) {
        _unitPrice = unitPrice;
    };


    this.toJson = function () {
        return {
            id: _id,
            itemCode: _itemCode,
            qty: _qty,
            unitPrice: _unitPrice
        };
    };
}
;
module.exports = OrderDetailDTO;