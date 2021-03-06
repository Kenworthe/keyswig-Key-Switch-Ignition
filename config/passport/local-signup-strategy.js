var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, callback){
	// Find a user with this email OR displayname
	User.findOne({ $or: [
		{ 'local.email': email },
		{ 'displayname': req.body.displayname }
	]}, 
	function(err, user){
		if (err){
			return callback(err);
		}
		else if (user){
			if (user.local.email === req.body.email){
				return callback(null, false, req.flash('error', 'This email is already taken.'));
			}
			else if (user.displayname === req.body.displayname){
				return callback(null, false, req.flash('error', 'This display name is already taken.'));
			}
			else {
				return callback(null, false, req.flash('error', 'Not sure what happened...'));
			}
		}
		else {
			// Create new user if email AND displayname not taken.
			var newUser = new User();
			newUser.local.email = email;
			newUser.local.password = newUser.encrypt(password);
			newUser.displayname = req.body.displayname;
			newUser.location = req.body.location;
			newUser.rating = [];

			newUser.save(function(err){
				return callback(err, newUser, req.flash('success', 'Signup Complete! Head to your Garage to add your cars!'));
			});
		}
	});
});

module.exports = strategy;