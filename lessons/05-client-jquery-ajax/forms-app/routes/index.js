var home = function(req, res) {

	res.render("home", {"classes": [
    	{name:"Olin.js", teacher:"Student"},
    	{name:"Circuits", teacher:"Brad"},
    	{name:"MatSci", teacher:"Rebecca"},
    	{name:"UOCD", teacher:"Sara"}]
   	});
};

module.exports.home = home;