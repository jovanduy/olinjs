var Ingredient = require('../models/ingredientModel.js');

var routes = {};

routes.showIngredients = function (req, res) {
	Ingredient.find({})
        .exec(function (err, ingredients) {
            if (err) {
				res.status(500).send("Error! Can't find ingredients :(");
			} else {
				if (ingredients.length > 0) {
                    var inStock = [];
                    var outOfStock = [];
                    var inStockMessage = '';
                    var outOfStockMessage = '';
                    for (var i=0; i < ingredients.length; i++) {
                        ingredients[i].inStock ? inStock.push(ingredients[i]) : outOfStock.push(ingredients[i]);
                    }
                    if (inStock.length > 0) {
                        inStockMessage = "In stock ingredients:";
                    } else {
                       inStockMessage = "No in stock ingredients"
                    }
                    
                    if (outOfStock.length > 0) {
                        outOfStockMessage = "Out of stock ingredients:";
                    } else {
                       outOfStockMessage = "No out of stock ingredients"
                    }
					res.render("ingredients", {"inStockMessage": inStockMessage, "inStockIngredients": inStock, "outOfStockMessage": outOfStockMessage, "outOfStockIngredients": outOfStock});
				} else {
					res.render("ingredients", {"inStockMessage": "No ingredients", "inStockIngredients": ingredients});
				}
			}
        });
}

routes.edit = function (req, res) {
    var edits = req.body;
    console.log(edits);
    
    Ingredient.count({name: edits.name}, function (err, count) {
        if (err) res.status(500).send("Problen editing your ingredient :(" + err);
        if (count > 0) {
            res.end();
        } else {
             Ingredient.findByIdAndUpdate(edits.id, {name: edits.name, price: edits.price}, function (err, ingredient) {
                if (err) {
                    res.status(500).send("Error finding ingredient");
                } else {
                    res.send(edits);
                }
            }); 
        }
    });
    
}

routes.addIngredient = function (req, res) {
    var ingredient = req.body;
    ingredient.inStock = true;
    var newIngredient = new Ingredient(ingredient);
    Ingredient.count({name: newIngredient.name}, function (err, count) {
        if (err) res.status(500).send("Problen editing your ingredient :(" + err);
        if (count > 0) {
            res.end();
        } else {
            newIngredient.save(function (err) {
                if (err) res.status(500).send("Problem adding new ingredient" + err);
            });
            res.send(newIngredient);
        }
    });
}

routes.makeOutOfStock = function (req, res) {
    Ingredient.findByIdAndUpdate(req.body.id, {inStock: false}, function (err, ingredient) {
        if (err) {
            res.status(500).send("Error finding ingredient" + err);
        } else {
            res.send(ingredient);
        }
    }); 
}

routes.restock = function (req, res) {
    Ingredient.findByIdAndUpdate(req.body.id, {inStock: true}, function (err, ingredient) {
        if (err) {
            res.status(500).send("Error finding ingredient" + err);
        } else {
            res.send(ingredient);
        }
    }); 
}

module.exports = routes;
