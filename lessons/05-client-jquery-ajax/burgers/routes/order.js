var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');
 
var routes = {};

routes.orderPage = function (req, res) {
    Ingredient.find({})
        .exec(function (err, ingredients) {
            if (err) {
                res.status(500).send("Sorry, we cannot take orders at this moment due to technical difficulties");
            } else {
                res.render("order", {"orderMessage": "Please place your order", "ingredients": ingredients});
            }
        });
}

routes.place = function (req, res) {
    var order = req.body;
    order.ingredients = order["ingredients[]"];
    console.log(order.ingredients);
    order.completed = false;
    var newOrder = Order(order);
    newOrder.save(function (err) {
        if (err) console.log("problem saving order " + err);
    });
    res.send(newOrder);
}


module.exports = routes;
