require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Ingredient = require('./../../../models/ingredientModel');

describe('Ingredient Model', function() {
  it('should create a new ingredient', function(done) {
    var ingredient = new Ingredient({
      name: 'cheese',
      price: 1,
      inStock: true
    });
    ingredient.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should edit an ingredient by name', function(done) {
    Ingredient.find({ name: 'cheese' }, function(err, ingredients) {
      if (err) {
        return done(err);
      }
      Ingredient.findByIdAndUpdate(ingredients[0], {inStock: false}, function (err, ingredient) {
        if (err) {
            return done(err);
        }
        done();
      });
    });
  });
});