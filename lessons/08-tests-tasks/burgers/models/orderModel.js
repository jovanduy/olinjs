var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    name: String,
    ingredients: [String],
    completed: Boolean
});

module.exports = mongoose.model("Order", orderSchema);
