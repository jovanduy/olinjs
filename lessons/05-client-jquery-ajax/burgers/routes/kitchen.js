var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');
 
var routes = {};

routes.showOrders = function (req, res) {
    Order.find({completed: false})
        .exec(function (err, orders) {
            if (err) {
                res.status(500).send("Cannot find orders");
            } else {
                if (orders.length > 0) {
                    res.render("kitchen", {"kitchenMessage": "Pending orders:", orders});
                } else {
                    res.render("kitchen", {"kitchenMessage": "No pending orders"})
                }
            }
        });
}

routes.completeOrder = function (req, res) {
    Order.findByIdAndUpdate(req.body.id, {'completed': true}, function (err, order) {
        if (err) {
            res.status(500).send("Cannot find order!");
        } else {
            res.send(order);
        }
    })
}

module.exports = routes;
