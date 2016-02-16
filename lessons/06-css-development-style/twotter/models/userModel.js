var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    twotes: [String],
    oauthID: Number
});

module.exports = mongoose.model("User", userSchema);