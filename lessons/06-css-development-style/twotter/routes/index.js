var User = require('../models/userModel.js');
var Twote = require('../models/twoteModel.js');

var routes = {};

routes.main = function(req, res) {
    var name = req.user;
    console.log(name);
    User.find({})
        .exec(function (err, users) {
            if (err) {
                res.status(500).send("Error! Cannot find any users!");
            } else {
                if (!users) {
                    res.end();
                } else {
                    Twote.find({})
                        .exec(function (err, twotes) {
                            if (err) {
                                res.status(500).send("Error! Cannot find any twotes!");
                            } else {
                                if (name) {
                                    res.render("home", {"users": users, "twotes": twotes.reverse(), "names": [name]});
                                } else {
                                    res.render("home", {"users": users, "twotes": twotes.reverse()});
                                }
                                
                            }
                        });
                }
            }
        });
}

routes.loginPage = function(req, res) {
    res.render("login");
}

routes.login = function(req, res) {
    var name = req.body.name;
    console.log(name);
    req.session.name = name;
    User.update({name: name}, {name: name}, {upsert: true}, function (err, user) {
        if (err) {
            res.status(500).send("Cannot find user!");
        } else {
            res.send(user);
        }
    });
}

routes.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

routes.submit = function(req, res) {
    var twote = req.body;
    var newTwote = new Twote(twote);
    newTwote.save(function (err) {
        if (err) res.status(500).send("Problem adding new twote " + err);
    });
    res.send(newTwote);
}

routes.delete = function (req, res) {
    Twote.remove({'text':req.body.text}, function (err) {
        res.status(500).send("Error!!! " + err)
    });
    console.log(req.body.text);
    res.send({"text":req.body.text});
}

module.exports = routes;