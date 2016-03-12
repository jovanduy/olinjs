var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');

// do you need to import auth here
var auth = require('./auth');
var fbAuth = require('./authentication.js');
var index = require('./routes/index');
var User = require('./models/userModel.js');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: 'superS3CRE7',
    resave: false,
    saveUninitialized: false ,
    cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        console.log(user);
        if(!err) done(null, user);
        else done(err, null);
    });
});

app.get('/', index.main);
app.get('/login', index.loginPage);

// app.post('/login', index.login);
app.post('/logout', index.logout);
app.post('/twotes', ensureAuthenticated, index.submit);
app.post('/twotes/delete', ensureAuthenticated, index.delete);

app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){});
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' })
);

mongoose.connect('mongodb://localhost/test');

app.listen(3000);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
}
