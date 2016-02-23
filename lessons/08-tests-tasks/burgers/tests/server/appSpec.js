var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return 200 OK on GET /ingredients', function(done) {
    request(app)
      .get('/ingredients')
      .expect(200, done);
  });
  // What other routes can you test?

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
  
  it('should respond with 200 OK on GET /order', function(done) {
      request(app)
        .get('/order')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on GET /kitchen', function(done) {
      request(app)
        .get('/kitchen')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on POST /ingredients/add', function(done) {
      request(app)
        .post('/ingredients/add')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on POST /ingredients/outOfStock', function(done) {
      request(app)
        .post('/ingredients/outOfStock')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on POST /ingredients/edit', function(done) {
      request(app)
        .post('/ingredients/edit')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on POST /ingredients/restock', function(done) {
      request(app)
        .post('/ingredients/restock')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on POST /order/placeOrder', function(done) {
      request(app)
        .post('/order/placeOrder')
        .expect(200, done);
  });
  
  it('should respond with 200 OK on POST /kitchen/completeOrder', function(done) {
      request(app)
        .post('/kitchen/completeOrder')
        .expect(200, done);
  });
  
});
