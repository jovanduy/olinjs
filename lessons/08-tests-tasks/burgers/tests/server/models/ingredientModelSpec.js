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

/* Structurally, this looks great!

   You asked whether it's ok for testing to mess up your database -- usually it's good practice for a test to
   leave the database unmodified if at all possible... which you can do pretty easily, with one more it(...) statement
   which tests that it's possible to delete the object you just added.

   With that in mind -- I think I might not have picked "cheese" as the name of the ingredient
   to try saving... seems reasonably likely that an ingredient by that name might already
   exist in whatever database you're hooked up to, and you might end up deleting both the existing one
   and the new one with the Ingredient.remove(...) call I'm saying you could add. Fortunately it doesn't really
   matter whether the name of the ingredient you're trying to save makes semantic sense in the context of a burger
   restaurant or not... so, here's what I've seen people do in cases like this: come up with some long,
   fairly-likely-to-be-unique string using the current unix epoch time, or a random number generator, or both combined.
   Not a big deal in this context, but safer in production.
*/
