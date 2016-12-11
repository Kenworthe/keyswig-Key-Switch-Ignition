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

router.post('/signup', function(req, res, next){
	var signUpStrat = passport.authenticate('local-signup', {
		successRedirect: '/todos',
		failureRedirect: '/signup',
		successFlash: true,
		failureFlash: true
	});
	return signUpStrat(req, res, next);
});

module.exports = router;