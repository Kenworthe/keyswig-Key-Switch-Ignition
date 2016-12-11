var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, username, callback){
	// Find a user with this email (using mongoose)
	User.findOne({ 'local.email': email }, function(err, user){
		if (err) {
			return callback(err);
		}
		if (user) {
			return callback(null, false, req.flash('error', 'This email is already taken.'));
		}
		else {
			// Create new user if no error or email not taken.
			var newUser = new User();
			newUser.local.email = email;
			newUser.local.password = newUser.encrypt(password);
			newUser.username = username;
			newUser.save(function(err){
				return callback(err, newUser);
			});
		}
	});
});

module.exports = strategy;