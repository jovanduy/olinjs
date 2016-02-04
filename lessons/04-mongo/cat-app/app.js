var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

var index = require('./routes/index');
var cats = require('./routes/cats');

var app = express();


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   var bob = new Robot({ name: 'Bob', abilities: ['killing'], isEvil: false});
// });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.use('/cats', cats);
// app.get('/cats/new', routes.newCat);
// app.get('/cats/bycolor/:color', routes.showByColor);
// app.get('/cats/delete/old', routes.deleteCat);
// app.get('/robots');

mongoose.connect('mongodb://localhost/test');
//Generally its good to include a print statement to know when the app has started.
app.listen(3000, function(){
	console.log("Listening on Port 3000");
});
