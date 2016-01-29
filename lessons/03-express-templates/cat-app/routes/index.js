var home = function(req, res) {

	res.render("home", {"heading": "Welcome to the cat app!",
    "message": "Things to do:",
    "links": ["/cats/new",
      "/cats",
      "/cats/bycolor/green",
      "/cats/delete/old"
    ]});
};

module.exports.home = home;