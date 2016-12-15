var passport = require('passport');
var controller = {};

// Sign up strategy

// function signupStrat(req, res, next){
// 	passport.authenticate('local-signup', {
// 		successRedirect: '/',
// 		failureRedirect: '/signup',
// 		failureFlash: true
// 	});
// }

// var signupStrat = passport.authenticate('local-signup', {
// 	successRedirect: '/',
// 	failureRedirect: '/signup',
// 	failureFlash: true
// });
// return signupStrat(req, res, next);

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// This function is necessary to authorize access to CRUD.
function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Oops! You are not logged in. Please sign up or login to continue.');
    res.redirect('/');
  }
  else {
    next();
  }
}

module.exports = controller;