$(document).ready(function (){
//    alert();
    loadTable();
    $("#btnAdd").click(function () {
        var formData=$("#frmItem").serialize();
        $.ajax("http://localhost:8080/item/add",{
            contentType: 'application/x-www-form-urlencoded',
            data:formData,
            dataType: 'json',
            method:'POST'                       
        }).done(function (json) {
            if(json.result==="success"){         
                $("#span-txt").html("Item has been successfully added...").css("color","green");
                $("#span-txt").css("display","inline");
                
            }else{
                $("#span-txt").html("Something went wrong....").css("color","red");
                $("#span-txt").css("display","inline");
            }
            $("#txtItemId").html("");
            $("#txtDescription").html("");
            $("#txtUnitprice").html("0.00");
            $("#txtQtyOnHand").html("");
            $("#txtItemId").focus();
            $("#span-txt").fadeOut(5000);
            
        });
        
    });
});
function loadTable() {
    $("#tbodyItem").empty();
    $.ajax("http://localhost:8080/item/all",{
            contentType: 'application/x-www-form-urlencoded',
            method:'POST'                       
        }).done(function (result) {
            if(result){
                $("#manage_total_items").html(result.data.length);
//                alert(result.data.length);
                var table=$("#tbodyItem");
                for(var index in result.data){
                    var rowData=result.data[index];
                    var  btn = $('<input />', {
                            type  : 'button',
                            value : 'Delete',
                            name  : rowData.code,
                            class :'btn btn-danger',
                            on    : {
                               click: function() {
                                   $.ajax("http://localhost:8080/item/delete",{
                                        contentType: 'application/x-www-form-urlencoded',
                                        data:{
                                            code:this.description
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
                            name  : rowData.code,
                            class :'btn btn-danger',
                            on    : {
                               click: function() {                                   
                                        window.location.href="add-item.html";
                                        $("#btnAdd").css("display","none");
                                        //alert($("#btnAdd").id);
                                       }
                                    }                                         
                        });
                    table.append("<tr><td>"+rowData.code+"</td><td>"+rowData.description+"</td><td>"+rowData.unitPrice+"</td><td>"+rowData.qtyOnHand+"</td><td id=\"holder"+index+"\"></td><td id=\"linkEdit"+index+"\"></td></tr>");
                    btn.appendTo($("#holder"+index));
                    btnEdit.appendTo($("#linkEdit"+index+""));
                }
            }else{
            }
        });
}