$(document).ready(function (){
    
//    var url = window.location.url.split("?");
//    url[1]
    
    loadTable();
    $("#btnupdateCustomer").click(function (){
        
        var formDataEdit=$("#updateDeleteForm").serialize();
        $.ajax("http://localhost:5050/customer/update",{
           contentType:"application/x-www-form-urlencoded",
           data:formDataEdit,
           dataType:"json",
           method:"POST"
        }).done(function(json){
            if(json.result==="success"){
                $("#spn-message").html("Customer has been succuess fully Updated");
                $("#spn-message").css("display","inline");
                $("#spn-message").css("color","green");
            }else{
                $("#spn-message").html("Customer hasn't been succuess fully Updated");
                $("#spn-message").css("display","inline");
                $("#spn-message").css("color","red");
            }
            $("#txtCustomerId").val("");
            $("#txtCustomerName").val("");
            $("#txtCustomerAddress").val("");
            $("#txtCustomerSalary").val("");
            $("#txtCustomerId").focus();
            $("#spn-message").fadeOut(4000);
            });
        });
    $("#btnAdd").click(function () {
        var formData=$("#frmCustomer").serializeArray();
        $.ajax("http://localhost:8080/customer/add",{
            contentType: 'application/x-www-form-urlencoded',
            data:formData,
            dataType: 'json',
            method:'POST'                       
        }).done(function (json) {
//            alert(json.result);
                
            if(json.result==="success"){
//                alert(json.result);            
                $("#span-txt").html("Customer has been successfully added...").css("color","green");
                $("#span-txt").css("display","inline");
                
            }else{
                $("#span-txt").html("Something went wrong....").css("color","res");
                $("#span-txt").css("display","inline");
            }
            $("#txtCustomerAddress").val("");
            $("#txtCustomerId").val("");
            $("#txtCustomerName").val("");
            $("#txtCustomerSalary").val("0.00");
            $("#txtCustomerId").focus();
            $("#span-txt").fadeOut(5000);
            
        });
        
    });
});



//$(document).ready(function(){        
//    
//});
function loadTable() {
    $("#tbodyCustomer").empty();
    $.ajax("http://localhost:8080/customer/all",{
            contentType: 'application/x-www-form-urlencoded',
            method:'POST'                       
        }).done(function (result) {
            if(result){
                $("#manage_total_items").html(result.data.length);
                //alert();
                var table=$("#tbodyCustomer");
                for(var index in result.data){
                    var rowData=result.data[index];
                    var  btn = $('<input />', {
                            type  : 'button',
                            value : 'Delete',
                            name  : rowData.id,
                            class :'btn btn-danger',
                            on    : {
                               click: function() {
                                   
                                   $.ajax("http://localhost:8080/customer/delete",{
                                        contentType: 'application/x-www-form-urlencoded',
                                        data:{
                                            id:this.name
                                        },
                                        dataType: 'json',
                                        method:'POST'
                                   }).done(function (result) {
                                       if(result.state){
//                                           alert(result.state);
                                            loadTable();
                                       }
                                    });
                               }
                            }                           
                            
                        });
                        
                    var  btnEdit = $('<input />', {
                            type  : 'button',
                            value : 'Edit',
                            name  : rowData.id+"?"+rowData.name+"?"+rowData.address+"?"+rowData.salary,
                            class :'btn btn-warning',
                            on    : {
                               click: function() {                                   
                                        window.location.href="update-customer.html?"+this.name;
                                        
                                        //alert($("#btnAdd").id);
                                       }
                                    }                                         
                            
                        });
                    
                    table.append("<tr><td>"+rowData.id+"</td><td>"+rowData.name+"</td><td>"+rowData.address+"</td><td>"+rowData.salary+"</td><td id=\"holder"+index+"\"></td><td id=\"linkEdit"+index+"\"></td></tr>");
                    btn.appendTo($("#holder"+index));
                    btnEdit.appendTo($("#linkEdit"+index+""));
                }
            }else{
                alert(result);
            }
        });
}