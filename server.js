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
var routerAccount = require('./routes/account');
var routerGarage = require('./routes/garage');


// Connect to database: mlabs OR localhost
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/carswap');
}

mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});



// SET view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layout/layout.ejs');

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
				  cookie: { maxAge: 30*24*60*60*1000 },
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
app.use('/account', routerAccount);
app.use('/my-garage', routerGarage);
// app.use('/browse', routerBrowse);

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