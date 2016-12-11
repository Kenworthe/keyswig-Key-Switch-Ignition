var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	local: {
		email: { type: String, required: true },
		password: { type: String, required: true }
	},
	username: { type: String, required: true },
	rating: { type: Array }
	},
	{ timestamps: true }
);

UserSchema.methods.encrypt = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password){
	return bcrypt.compare(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);