var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var Car = require('../models/car.js');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// This function is necessary to authorize authenticated users only.
function authenticate(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash('error', 'Oops! You are not logged in. Please sign up or login to continue.');
		res.redirect('/');
	}
	else {
		next();
	}
}

// GET account page
router.get('/', authenticate, function(req, res, next) {
	res.render('account.ejs', { user: currentUser, title: 'My Account' });
});

//GET account edit page
router.get('/edit', authenticate, function(req, res, next) {
	res.render('account-edit.ejs', { user: currentUser, title: 'Edit Account '});
});

//PUT account edit request
router.put('/edit', authenticate, function(req, res, next) {
	console.log('-->currentUser: ' + currentUser);
	console.log('-->new user info: ');
	console.log(req.body);

	// If user is changing password, make sure currentPassword is Valid.
	if( (req.body.newPassword || req.body.newPasswordConfirm) &&
		(req.body.newPassword === req.body.newPasswordConfirm)) {
		console.log('newPassword === newPasswordConfirm');
	// 	User.findOne({ _id: currentUser._id }, function(err, user){
	// 		console.log(user);
	// 		if (err){
	// 			return next(err);
	// 		}
	// 		if (!user.isValidPassword(req.body.password)){
	// 			req.flash('error', 'Incorrect current password. Password was not changed.')
	// 			res.redirect('/account/edit');
	// 			console.log('invalid password. redirecting to /account/edit.');
	// 		}
	// 		else {
	// 			currentUser.local.password = User.encrypt(req.body.newPassword);
	// 			console.log('set new encrypted pw for currentUser');
	// 		}
	// 	});
	}

	// If user is changing email or displayname, need to make sure it's not already taken.
	// currentUser.local.email = req.body.email;
	// currentUser.displayname = req.body.displayname;
	currentUser.location = req.body.location;
	currentUser.bio = req.body.bio;
	currentUser.save()
	.then(function(savedUser){
		res.redirect('/account');
	}, function(err){
		return next(err);
	})
	.then(function(){
		var foundCars = Car.find({ owner: currentUser._id });
		foundCars.forEach(function(car){
			car.location = currentUser.location;
		});
	});
});


module.exports = router;