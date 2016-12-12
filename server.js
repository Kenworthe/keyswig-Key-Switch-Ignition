var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var ejsLayouts = require('express-ejs-layouts');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var session = require('express-session');


// set routes
///////////////////
///////////////////
///////////////////
var routerHome = require('./routes/index');
var routerUsers = require('./routes/users');
var routerCars = require('./routes/cars');

// use mongoose to CONNECT to local db. change this to mlabs later.
mongoose.connect('mongodb://localhost/carswap');

// SET view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout.ejs');

// USE all middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));

// USE session ID cookies and passport
app.use(session({ secret: 'test cookie',
				  cookie: { maxAge: 2628000000 },
				  resave: true,
				  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// REQUIRE passport strategy config files. (link them)
var passportApplyConfig = require('./config/passport/passport.js');
passportApplyConfig(passport);

// USE function to set global.user (logged in user);
app.use(function (req, res, next) {
	global.currentUser = req.user;
	next();
});

// USE all Routers. Must be after middleware.
///////////////////
///////////////////
///////////////////
app.use('/', routerHome);
app.use('/users', routerUsers);
app.use('/cars', routerCars);

// Error handlers:
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
	console.log(err);
});

module.exports = app;