function CustomerDTO(id,name,qtyOnHand,price) {
    var _id=id;
    var _name=name;
    var _qtyOnHand=qtyOnHand;
    var _price=price;
    
    this.getId=function(){
        return _id;
    };
    this.getName=function () {
        return _name;
    };
    this.getQtyOnHand=function () {
        return _qtyOnHand;
    };
    this.getPrice=function () {
        return _price;
    };
    
    this.setId=function (id) {
        _id=id;
    };
    this.setName=function (name) {
        _name=name;
    };
    this.setQtyOnHand=function(qtyOnHand){
        _qtyOnHand=qtyOnHand;
    };
    this.setPrice=function (price) {
        _price=price;
    };
    
    this.toJson=function () {
        return {
            id:_id,
            name:_name,
            qtyOnHand:_qtyOnHand,
            price:_price
        };
    };
}
;
module.exports=CustomerDTO;