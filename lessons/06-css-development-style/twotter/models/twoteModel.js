var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Twote", twoteSchema);
