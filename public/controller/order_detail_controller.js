var id="";
$(document).ready(function () {
    
    function getQueryVariable()
        {
       var query = window.location.search.substring(1);
       var vars = query.split("?");
       this.id=vars[0];
        alert(this.id);
       
        };
        getQueryVariable();
    loadTable();
});


function loadTable() {
//    alert();
    $("#tbodyOrderDetail").empty();
    $.ajax("http://localhost:8080/orderdetail/all?"+this.id, {
        contentType: 'application/x-www-form-urlencoded',
        method: 'POST'
    }).done(function (result) {
        if (result) {
//            alert(result);
            $("#manage_total_items").html(result.data[0].orderId);
            var table = $("#tbodyOrderDetail");
            for (var index in result.data) {
                var rowData = result.data[index];
//                alert(rowData);
                table.append("<tr><td>" + rowData.itemCode + "</td><td>" + rowData.qty + "</td><td>" + rowData.unitPrice + "</td></tr>");
//                btnEdit.appendTo($("#linkEdit" + index + ""));
            }
        } else {
            alert(result);
        }
    });
}