$(document).ready(function () {
    loadTable();
});

function loadTable() {
    $("#tbodyOrder").empty();
    $.ajax("http://localhost:8080/order/all", {
        contentType: 'application/x-www-form-urlencoded',
        method: 'POST'
    }).done(function (result) {
        if (result) {
            $("#manage_total_items").html(result.data.length);
            var table = $("#tbodyOrder");
            for (var index in result.data) {
                var rowData = result.data[index];

                var btnEdit = $('<input />', {
                    type: 'button',
                    value: 'View',
                    name: rowData.id,
                    class: 'btn btn-danger',
                    on: {
                        click: function () {
                            window.location.href = "order-details.html?" + this.name;
                        }
                    }

                });
                table.append("<tr><td>" + rowData.id + "</td><td>" + rowData.date + "</td><td>" + rowData.name + "</td><td id=\"linkEdit" + index + "\"></td></tr>");
                btnEdit.appendTo($("#linkEdit" + index));
            }
        } else {
            alert(result);
        }
    });
}