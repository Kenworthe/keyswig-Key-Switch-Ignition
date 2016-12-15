var express = require('express');
var router = express.Router();
var passport = require('passport');
var Car = require('../models/car.js');
var User = require('../models/user.js');

// This function is necessary to authorize authenticated users only.
function authenticate(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash('error', 'Please signup or login.');
		res.redirect('/');
	}
	else {
		next();
	}
}

// GET home page
router.get('/', function(req, res, next){
	if (currentUser){
		Car.find({ owner: {$ne: currentUser._id} }).populate('owner')
		.then(function(allCars){
			console.log(allCars[0]);
			res.render('index.ejs', { 
				cars: allCars, 
				title: 'keyswig', 
				message: req.flash() 
			});
		},
		function(err) {
			return next(err);
		});
	}
	else {
		res.render('landing.ejs', {
			cars: null,
			title: 'keyswig',
			message: req.flash()
		});
	}
});

//GET signup page
router.get('/signup', function(req, res, next){
	res.render('signup.ejs', { title: 'Sign Up', message: req.flash() });
});

//POST signup -> check passport
router.post('/signup', function(req, res, next){
	//WARNING: REMOVE THIS CONSOLE.LOG. It shows PW.
	console.log('POST - received signup attempt: ');
	console.log(req.body);
	var signupStrat = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		successFlash: true,
		failureFlash: true
	});
	return signupStrat(req, res, next);
});

// GET login page
router.get('/login', function(req, res, next){
	res.render('login.ejs', { title: 'Log In', message: req.flash() });
});

//POST login -> check passport
router.post('/login', function(req, res, next){
	var loginStrat = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrat(req, res, next);
});

//GET logout page.
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

//GET contact page.
router.get('/contact/:id', authenticate, function(req, res, next){
	User.findOne({ _id: req.params.id }, function(err, foundUser){
		if (err) {
			return next(err);
		}
		var userAndCars = {};
		userAndCars.user = foundUser;

		Car.find({ owner: req.params.id }, function(err, foundCars){
			if (err) {
				return next(err);
			}
			userAndCars.cars = foundCars;
			res.render('contact.ejs', { 
				title: 'Contact Owner',
				user: userAndCars.user, 
				cars: userAndCars.cars,
				message: req.flash()
			});
		});
	});
});


module.exports = router;