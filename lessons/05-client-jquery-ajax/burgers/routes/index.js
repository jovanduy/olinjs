var routes = {};

routes.home = function(req, res) {
    res.render("home", {"heading": "Welcome to Jessica's burgers!",
        "message": "Things to do:",
            "links": ["/ingredients",
                "/order",
                "/kitchen"
    ]});  
}

module.exports = routes;
