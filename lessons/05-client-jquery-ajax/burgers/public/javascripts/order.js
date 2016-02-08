var $orderForm = $("form.orderForm");
var $ingredients = $("input.ingredients");

var onOrderSuccess = function (data, status) {
    if (!data) {
        alert("Error!");
    } else {
        $orderForm.css('display', 'none');
        $('#orderMessage').html('Your order has been placed!');
    }
}

var onOrderError = function (data, status) {
    console.log("status", status);
    console.log("error", data);
}

$orderForm.submit(function (event) {
    // getting ids of checked checkboxes:
    // http://stackoverflow.com/questions/6901242/jquery-get-the-ids-of-the-checked-and-not-checked-checkbox/6901730#6901730
    event.preventDefault();
    var name = $orderForm.find("[name='name']").val();
    var ingredients = $('input:checkbox:checked').map(function () { return this.name}).get();
    console.log(ingredients.length);
    console.log(ingredients);
    $.post('/order/placeOrder', {
        name: name,
        ingredients: ingredients
    })
        .done(onOrderSuccess)
        .error(onOrderError);
});

$ingredients.click(function () {
    var $price = $('#price');
    var checkbox = event.target;
    var total = $price.html();
    var checkedValue = $(checkbox).is(':checked') ? checkbox.value : -checkbox.value;
    $price.html((Number(total) + Number(checkedValue)).toFixed(2));
});