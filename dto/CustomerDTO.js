function CustomerDTO(id,name,address,salary) {
    var _id=id;
    var _name=name;
    var _address=address;
    var _salary=salary;
    
    this.getId=function(){
        return _id;
    };
    this.getName=function () {
        return _name;
    };
    this.getAddress=function () {
        return _address;
    };
    this.getSalary=function () {
        return _salary;
    };
    
    this.setId=function (id) {
        _id=id;
    };
    this.setName=function (name) {
        _name=name;
    };
    this.setAddress=function(address){
        _address=address;
    };
    this.setSalary=function (salary) {
        _salary=salary;
    };
    
    this.toJson=function () {
        return {
            id:_id,
            name:_name,
            address:_address,
            salary:_salary
        };
    };
}
;
module.exports=CustomerDTO;