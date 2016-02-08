var $complete = $("button.complete-btn");
var $list;

var onCompleteError = function (data, status) {
    console.log("status", status);
    console.log("error", data);
}

var onCompleteSuccess = function (data, status) {
    if (!data) {
        alert("Cannot add duplicate ingredient!");
    } else {
        $list.css('display', 'none');
        $list.removeClass("orders");
        if ($('.orders').length === 0) {
            $('#kitchenMessage').html('No pending orders');
        }
        $('#orderMessage').html('Your order has been placed!');
    }
}

$complete.click(function () {
    var id = $complete.attr('id');
    $list = $('.' + id);
    $.post('/kitchen/completeOrder', {
        id: id
    })
        .done(onCompleteSuccess)
        .error(onCompleteError);
});