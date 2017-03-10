
$(document).ready(function () {
    //var validate = require("validate.js");
    var customerDetail="";
    var itemDetail=[];
    var selectedItem="";
    var total=0;
    $("#tbodyItemCart").empty();
   $.ajax("http://localhost:8080/customer/all",{
            contentType: 'application/x-www-form-urlencoded',
            method:'POST'                       
        }).done(function (result) {
            var customerList=[];
            for(var i in result.data){
                var rowData=result.data[i];
                customerList.push({
                    value:rowData.name, 
                    label:rowData.name,
                    custId:rowData.id,
                    date:"",
                    id:""
                });   
            }
//            alert(customerList);
            $("#actvCustomer").autocomplete({
                source:customerList,
                select:function (event,ui) {
                    customerDetail=ui.item;
                    
                }
            });
        }); 
        
   $.ajax("http://localhost:8080/item/all",{
            contentType: 'application/x-www-form-urlencoded',
            method:'POST'                       
        }).done(function (result) {
            var itemList=[];
            for(var i in result.data){
                var rowData=result.data[i];
                itemList.push({
                    value:rowData.description, 
                    label:rowData.description,
                    code:rowData.code,
                    onHand:rowData.qtyOnHand,
                    price:rowData.unitPrice,
                    qty:""
                });   
            }
//            alert(itemDetail+"\n"+customerDetail);
            $("#actvItem").autocomplete({
                source:itemList,
                select:function (event,ui) {
                    selectedItem=ui.item;
                    $("#txtOnHandQty").val(ui.item.onHand).css("color","red");
                    //alert(itemDetail[0].code);
                }
            });
    }); 
    $("#btnAddItemToCart").click(function () {
        selectedItem.qty=$("#txtItemQty").val();
        var amount=selectedItem.qty*(selectedItem.price);
        $("#tbodyItemCart").append("<tr class=\"register-items-header\"><td>"+selectedItem.code+"</td><td>"+selectedItem.label+"</td><td>"+selectedItem.price+"</td><td>"+selectedItem.qty+"</td><td>"+amount+"</td></tr>");
        total+=amount;
        //alert(total);
        $("#txtTotal").html(total);
        $("#txtSubTotal").html(amount);
        itemDetail.push(selectedItem);
        $("#actvItem").val("");
        $("#txtItemQty").val("");
        $("#txtOnHandQty").val("");
//        alert(itemDetail.length+"   "+itemDetail);
    });
    
    $("#btnAddOrder").click(function() {
        if( validate.isEmpty(itemDetail)){
            $("#actvItem").focus().select();
            alert("Please add item");
            
            return ;
        }
        if(validate.isEmpty(customerDetail)){
            $("#actvCustomer").focus();
            alert("please add customer");
            return ;
        }
        $.ajax("http://localhost:8080/order/add",{
            contentType: 'application/x-www-form-urlencoded',
            data:{customer:customerDetail,items:itemDetail},
            dataType: 'json',
            method:'POST'    
        }).done(function (response) {
            if(response.result){
//                alert("done");
                $("#outPlaceOrder").html("Order has been succuess fully added");
                $("#outPlaceOrder").css("display","inline");
                $("#outPlaceOrder").css("color","green");
            }else{
                $("#outPlaceOrder").html("Somethig went wrong");
                $("#outPlaceOrder").css("display","inline");
                $("#outPlaceOrder").css("color","red");
            }
            $("#actvItem").focus();
            $("#outPlaceOrder").fadeOut(4000);
            setTimeout(function () {
                window.location.reload();
            },4110);
        });
    });
            
});


