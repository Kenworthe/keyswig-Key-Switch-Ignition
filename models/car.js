var mongoose = require('mongoose');
var User = require('./user.js');

var CarSchema = new mongoose.Schema({
	owner: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	borrower: 		{ type: String },
	make: 			{ type: String, required: true },
	model: 			{ type: String, required: true },
	year: 			{ type: Number, required: true },
	licensePlate: 	{ type: String },
	mileage: 		{ type: Number },
	location:		{ type: String, required: true },
	description: 	{ type: String }
});


module.exports = mongoose.model('Car', CarSchema);