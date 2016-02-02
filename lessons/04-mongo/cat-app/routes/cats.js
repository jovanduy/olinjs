// var db = require('../fakeDatabase');
var express = require('express');
var router = express.Router();
var Cat = require('../models/catModel.js');
var catInfo = require('./possibleCatInfo');

var catColors = catInfo.colors;
var colorsLen = catColors.length;
var catNames = catInfo.names;

// constructs and returns a cat object
// function Cat(name, age, colors){
// 	var cat = {
//     	name: name,
//     	age: age,
//     	colors: colors
//   	};
//   	return cat;
// }

function getRandomNumber(min, max) {
	// random number from within a range from:
	// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', function(req, res) {
	// sort array of objects by attribute:
	// http://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
	// http://www.w3schools.com/jsref/jsref_sort.asp
	Cat.find({})
		.sort({age: -1})
		.exec(function (err, cats) {
			if (err) {
				res.render("cats", {"message": "You have no cats! You are not a true cat lady :(", "cats": cats});
			} else {
				if (cats.length > 0) {
					res.render("cats", {"message": "All cats sorted by age", "cats": cats});
				} else {
					res.render("cats", {"message": "You have no cats! You are not a true cat lady :(", "cats": cats});
				}
			}
		});
});

router.get('/new', function(req, res) {
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
	console.log(colors);
	var catAge = getRandomNumber(0, 500);
	var cat = new Cat({name: catNames[nameNum], age: catAge, color: colors});

	cat.save(function (err) {
  		if (err) {
    		console.log("Problen saving your cat :(", err);
  		}
	});
	
	res.render("cats", {"message": "New cat created:", "cats": [cat]});
});

router.get('/bycolor/:color', function showByColor (req, res) {
	var color = req.params.color;
	
	Cat.find({color: color})
		.sort({age: -1})
		.exec(function (err, cats) {
			if (err) {
				res.status(500).send("Error! Can't find the cats :(");
			} else {
				if (cats.length > 0) {
					res.render("cats", {"message": "All " + color  + " cats by age:", "cats": cats});
				} else {
					res.render("cats", {"message": "No " + color  + " cats", "cats": cats});
				}
			}
		});
});

router.get('/bycolor/:color/olderthan/:age', function (req, res) {
	var color = req.params.color;
	var age = req.params.age;

	Cat.find({$and : [{color: color}, {age: {$gt: age}}]})
		.sort({age: -1})
		.exec(function (err, cats) {
			if (err) {
				res.status(500).send("Error! Can't find the cats :(");
			} else {
				if (cats.length > 0) {
					res.render("cats", {"message": "All " + color  + " cats older than " + age + " by age:", "cats": cats});
				} else {
					res.render("cats", {"message": "No " + color  + " cats older than " +age, "cats": cats});
				}
			}
		})
});

router.get('/delete/old', function deleteCat(req, res) {
	// sort array of objects by attribute:
	// http://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
	// http://www.w3schools.com/jsref/jsref_sort.asp
	Cat.findOneAndRemove({}, {sort: {age: -1}}, function (err, cat) {
		if (err) {
			res.status(500).send("Error! Can't find the cats :(");
		} else {
			if (cat) {
				res.render("cats", {"message": "The oldest cat has been sent to a nice farm in the country! Goodbye to:",
					"cats": [cat]
				});
			} else {
				res.render("cats", {"message": "There are no cats to send away!", "cats": null});
			}
		}
	});
});

module.exports = router;
