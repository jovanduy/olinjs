var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

var index = require('./routes/index');
var ingredients = require('./routes/ingredients')
var order = require('./routes/order');
var kitchen = require('./routes/kitchen');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/ingredients', ingredients.showIngredients);
app.get('/order', order.orderPage);
app.get('/kitchen', kitchen.showOrders);

app.post('/ingredients/add', ingredients.addIngredient);
app.post('/ingredients/outOfStock', ingredients.makeOutOfStock);
app.post('/ingredients/edit', ingredients.edit);
app.post('/ingredients/restock', ingredients.restock);
app.post('/order/placeOrder', order.place);
app.post('/kitchen/completeOrder', kitchen.completeOrder);

mongoose.connect('mongodb://localhost/test');

app.listen(3000);