var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	local: {
		email: { type: String, required: true },
		password: { type: String, required: true }
	},
	displayname: { type: String, required: true },
	rating: { type: Array }
	},
	{ timestamps: true }
);

//use sync over async because: don't want race condition, though sync is slower.
UserSchema.methods.encrypt = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);