var $addIngredient = $("#addIngredient");
var $makeOutOfStock = $("form.inStock");
var $restock = $("form.outOfStock");
var $edit = $(".edit");
resetHandlers();

function resetHandlers () {
    $makeOutOfStock = $("form.inStock");
    $restock = $("form.outOfStock");
    $edit = $(".edit");
    addForm();
    editClick();
    restock();

}
// error callback
var onError = function (data, status) {
    console.log("status", status);
    console.log("error", data);
}

// success callback for adding new ingredient
var onAddSuccess = function (data, status) {
    if (!data) {
        alert("Cannot add duplicate ingredient!");
    } else {
        var $ingredientForm = $('form.fakeInStock').first().clone();
        $ingredientForm.attr('id', data._id);
        $ingredientForm.attr('class', 'inStock');
        $ingredientForm.find('p').html(data.name + ": $" + (Number(data.price)).toFixed(2));
        $ingredientForm.css('display', "block");
        $("#inStock").append($ingredientForm);
        resetHandlers();
        $("#inStockMessage").html("In stock ingredients:");
    }
}

// adding new ingredient
$addIngredient.submit(function (event) {
    event.preventDefault();
    var name = $addIngredient.find("[name='name']").val();
    var price = $addIngredient.find("[name='price']").val();
    $.post('/ingredients/add', {
        name: name,
        price: (Number(price)).toFixed(2)
    })
        .done(onAddSuccess)
        .error(onError); 
});

// refresh in stock form
function addForm() {
    // make out of stock
    $makeOutOfStock.submit(function (event) {
        event.preventDefault();
        var id = $makeOutOfStock.attr('id');
        $.post('/ingredients/outOfStock', {
            id: event.target.id
        })
            .done(onOutOfStockSuccess)
            .error(onError); 
    });
}

// success callback for making out of stock
var onOutOfStockSuccess = function (data, status) {
    if (!data) {
        console.log('wtf');
    } else {
        var $form = $('form#' + data._id);
        $form.attr('class', 'outOfStock');
        $form.find("input[type='submit']").val("Restock");
        $("div#outOfStock").append($form);
        resetHandlers();
        if ($makeOutOfStock.children.length === 0) {
            $("#inStockMessage").html("No in stock ingredients");
        }
        $("#outOfStockMessage").html("Out of stock ingredients:");
    }
}


var onEditSuccess = function (data, status) {
    if (!data) {
        alert("Two ingredients cannot have the same name");
    } else {
        console.log(data);
        console.log("what a butt");
        var $form = $('form#' + data.id);
        console.log($form);
        $form.find('p').html(data.name + ": $" + (Number(data.price)).toFixed(2));
    }
}

function editClick () {
    $edit.click(function () {
        var $form = $(event.target).closest('form');
        var id = $form.attr('id');
        var name = prompt("Enter new name");
        var price;
        do {
            price = Number(prompt("Enter new price (numbers only)")).toFixed(2);
        } while (isNaN(price));
        $.post('/ingredients/edit', {
            id: id,
            name: name,
            price: (Number(price)).toFixed(2)
        })
            .done(onEditSuccess)
            .error(onError);
    });
}

// success callback for restocking
var onRestockSuccess = function (data, status) {
    if (!data) {
        console.log('wtf');
    } else {
        var $form = $('form#' + data._id);
        $form.attr('class', 'inStock');
        $form.find("input[type='submit']").val("Out of Stock");
        $("div#inStock").append($form);
        resetHandlers();
        if ($restock.children.length === 0) {
            $("#outofStockMessage").html("No out of stock ingredients");
        }
        $("#inStockMessage").html("In stock ingredients:");
    }
}

function restock () {
    $restock.submit(function (event) {
        event.preventDefault();
        var id = $restock.attr('id');
        $.post('/ingredients/restock', {
            id: event.target.id
        })
            .done(onRestockSuccess)
            .error(onError); 
    });
}
