var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    twotes: [String], // I might have this reference the actual twote objects via ObjectIds
    oauthID: Number
});

module.exports = mongoose.model("User", userSchema);
