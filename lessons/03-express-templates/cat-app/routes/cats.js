var db = require('../fakeDatabase');
var catInfo = require('./possibleCatInfo');

var catColors = catInfo.colors;
var colorsLen = catColors.length;
var catNames = catInfo.names;

var routes = {};

// constructs and returns a cat object
function Cat(name, age, colors){
	var cat = {
    	name: name,
    	age: age,
    	colors: colors
  	};
  	return cat;
}

function getRandomNumber(min, max) {
	// random number from within a range from:
	// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

routes.showAll = function(req, res) {
	// sort array of objects by attribute:
	// http://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
	// http://www.w3schools.com/jsref/jsref_sort.asp
	var allCats = db.getAll();
	if (allCats.length > 0) {
		allCats.sort(function(a,b) { return a.age - b.age } );
		res.render("cats", {"message": "All cats sorted by age", "cats": allCats});
	} else {
		res.render("cats", {"message": "You have no cats! You are not a true cat lady :(", "cats": allCats});
	}
};

routes.newCat = function(req, res) {
	// array contains value from:
	// http://stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value
	var nameNum = getRandomNumber(0, catNames.length - 1);
	var numberOfColors = getRandomNumber(1, 3);
	var colors = [];
	for (var i = 0; i < numberOfColors; i++) {
		var colorNum = getRandomNumber(0, colorsLen - 1);
		while (colors.indexOf(catColors[colorNum]) > -1) {
			colorNum = getRandomNumber(0, colorsLen - 1);
		}
		colors.push(catColors[colorNum]);
	};
	var catAge = getRandomNumber(0, 500);

	var cat = Cat(catNames[nameNum], catAge, colors);

	db.add(cat);
	
	res.render("cats", {"message": "New cat created:", "cats": [cat]});
};

routes.showByColor = function(req, res) {
	// sort array of objects by attribute:
	// http://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
	// http://www.w3schools.com/jsref/jsref_sort.asp
	var catsOfColor = [];
	var allCats = db.getAll();
	var color = req.params.color;
	for (var i = 0; i < allCats.length; i++) {
		if (allCats[i].colors.indexOf(color) > -1) catsOfColor.push(allCats[i]);
	};
	if (catsOfColor.length > 0) {
		catsOfColor.sort(function(a,b) { return a.age - b.age } );
		res.render("cats", {"message": "All " + color  + " cats by age:", "cats": catsOfColor});
	} else {
		res.render("cats", {"message": "No " + color  + " cats", "cats": catsOfColor});
	}
};

routes.deleteCat = function(req, res) {
	// sort array of objects by attribute:
	// http://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
	// http://www.w3schools.com/jsref/jsref_sort.asp
	var allCats = db.getAll();
	if (allCats.length > 0) {
		allCats.sort(function(a,b) { return a.age - b.age } );
		var removedCat = allCats.pop();
		db.remove(db.getAll().indexOf(removedCat));
		res.render("cats", {"message": "The oldest cat has been sent to a nice farm in the country! Goodbye to:",
			"cats": [removedCat]
		});
	} else {
		res.render("cats", {"message": "There are no cats to send away!", "cats": allCats});
	}
};

module.exports = routes;
