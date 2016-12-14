var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, 
function(req, email, password, done){
	User.findOne({ 'local.email': email }, function(err, user){
		// console.log('Found user obj in db: ');
		// console.log(user);
		if (err){
			return done(err);
		}
		else if (!user) {
			return done(null, false, req.flash('error', 'User not found.'));
		}
		else if (!user.isValidPassword(password)){
			return done(null, false, req.flash('error', 'Oops! Wrong email or password.'));
		}
		else {
			return done(null, user);
		}
	});
});

module.exports = strategy;