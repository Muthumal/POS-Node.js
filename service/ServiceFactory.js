var express=require('express');
var bodyParser = require('body-parser');

var CustomerDTO = require('../dto/CustomerDTO');
var ItemDTO = require('../dto/ItemDTO');
var OrderDTO = require('../dao/OrderDAO');
var OrderDetailDTO = require('../dto/OrderDetailDTO');

var CustomerBO = require('../business/CustomerBO');
var ItemBO = require('../business/ItemBO');
var OrderBO = require('../business/OrderBO');
var OrderDetailBO = require('../business/OrderDetailBO');


var routingHandler=express.Router();

routingHandler.use(bodyParser.json()); 
routingHandler.use(bodyParser.urlencoded({ extended: true })); 

routingHandler.all("/:service/:serviceType",function (req,res) {
//    res.send(req.params); 
    switch (req.params.service){
        case "customer":
            switch (req.params.serviceType){
                case "add":
                    var customer=new CustomerDTO(
                            req.body.txtCustomerId,
                            req.body.txtCustomerName,
                            req.body.txtCustomerAddress,
                            req.body.txtCustomerSalary
                    );
                    CustomerBO.addCustomer(customer,function (result) {
                        if(result){
                            res.send({result:"success"});
                        }else{
                            res.send({result:"faild"});
                        }
                        
                    });
//                    console.log(customer.getName());
//                    res.send(req.body);
                    break;
                case "delete":
                    CustomerBO.deleteCustomer(req.body.id,function (result) {                        
//                        console.log(result);
                        res.send({state:result});                        
                    });
                    break;
                case "update":
                    res.send("update customer");
                    break;
                case "search":
                    var customer = new CustomerDTO(
                            req.body.txtCustomerId,
                            req.body.txtCustomerName,
                            req.body.txtCustomerAddress,
                            req.body.txtCustomerSalary
                            );
                    CustomerBO.updateCustomer(customer,function (result){
                           if(result){
                               res.json({result:"success"});
                           } else{
                               res.json({result:"failed"});
                           }
                        });
                    break;
                case "all":
                    CustomerBO.allCustomer(function (result) {
                        if(result){
                            res.send({data:result});
                        }else{
                            res.send(false);
                        }
                    });
            }
            break;
        case "item":
            switch (req.params.serviceType){
                case "add":
                    var item = new ItemDTO(
                            req.body.txtItemId,
                            req.body.txtDescription,
                            req.body.txtUnitprice,
                            req.body.txtQtyOnHand
                            );
                    ItemBO.addItem(item, function (result) {
                        if (result) {
                            res.send({result: "success"});
                        } else {
                            res.send({result: "faild"});
                        }
                    });
//                    console.log(item.getDescription());
//                    res.send(req.body);
                    break;
                case "delete":
//                    console.log(req.body.code);
                    ItemBO.deleteItem(req.body.code, function (result) {
//                        console.log(result);
                        res.send({state: result});
                    });
                    break;
                case "update":
                    res.send("update customer");
                    break;
                case "search":
                    res.send("search customer");
                    break;
                case "all":
                    ItemBO.allItem(function (result) {
                        if(result){
                            res.send({data:result});
                        }else{
                            res.send(false);
                        }
                    });
            }
            break;
        case "order":
            switch (req.params.serviceType){
                case "add":
                    //var out=false;
                    var orderDetails=[];
                    OrderBO.addOrder(req.body,function (result,orderId) {
                        if(result){
                            for(var i in req.body.items){
                                var item=req.body.items[i];
                                //console.log(item);
                                var dto=new OrderDetailDTO(orderId,item.code,item.qty,item.price);
                                //console.log(dto.getItemCode()+"   ***************="+item.code);
                                orderDetails.push(dto);
                            }
                            OrderDetailBO.addOrder(orderDetails,function (result) {
                                console.log("add order detail in factory:"+result);
                                var out=true;
                                if(result){
                                    for (var i in req.body.items){
                                        var item=req.body.items[i];
                                        var qtyOnHand=parseInt(item.onHand)-parseInt(item.qty);
                                        var dto=new ItemDTO(item.code,item.value,qtyOnHand,item.price);
                                        ItemBO.updateItem(dto,function (result) {
                                            out&=result;
                                        });
                                    }
                                    if(out){
                                        console.log(out);
                                        res.send({result:true});

                                    }else{
                                        console.log(out);
                                        res.send({result:false});
                                    }
                                }else{
                                    res.send({result:false});
                                }

                            });
                        }else{
                            res.send({result:false});
                        }
                        
//                        console.log(orderDetails);
                    });
                    
//                    console.log(req.body.customer.value);
                    break;
                case "delete":
                    res.send("delete customer");
                    break;
                case "update":
                    res.send("update customer");
                    break;
                case "search":
                    res.send("search customer");
                    break;
                case "all":
                    OrderBO.allOrder(function (result) {
                        if (result) {
                            console.log(result.length);
                            res.send({data: result});
                        } else {
                            res.send(false);
                        }
                    });

                    break;
            }
            break;
            
            case "orderdetail":
            switch (req.params.serviceType) {
                case "add":
                    res.send("add customer");
                    break;
                case "delete":
                    res.send("delete customer");
                    break;
                case "update":
                    res.send("update customer");
                    break;
                case "search":
                    res.send("search customer");
                    break;
                case "all":
                    var url = req.url;
                    var id = url.split("?")[1];
//                    console.log(id);
                    OrderDetailBO.allOrderDetail(id,function (result) {
                        if (result) {
//                            console.log(result);
                            res.send({data: result});
                        } else {
                            res.send(false);
                        }
                    });

                    break;
            }
            break;
        default:
            break;
    }
});

module.exports=routingHandler;