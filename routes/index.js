var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET home page
router.get('/', function(req, res, next){
	res.render('index.ejs', { title: 'Car Swap App', message: req.flash() });
});

//GET signup page
router.get('/signup', function(req, res, next){
	res.render('signup.ejs', { title: 'User Registration', message: req.flash() });
	// res.update('main', '/signup.ejs', { title: 'User Registration' });
});

// POST signup info to server

// router.post('/signup', 
// 	passport.authenticate('local-signup', {
// 		successRedirect: '/user',
// 		failureRedirect: '/signup',
// 		failureFlash: true
// 	}),
// 		function(req, res, next){
// 			console.log('Signup successful: ' + req.user.username);
// });

//POST signup -> check passport
router.post('/signup', function(req, res, next){
	console.log('POST - received signup attempt: ');
	console.log(req.body);
	var signupStrat = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
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


module.exports = router;