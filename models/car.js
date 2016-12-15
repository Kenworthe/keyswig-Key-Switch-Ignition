var mongoose = require('mongoose');
var User = require('./user.js');

var CarSchema = new mongoose.Schema({
	owner: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	borrower: 		{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	make: 			{ type: String, required: true },
	model: 			{ type: String, required: true },
	year: 			{ type: Number, required: true },
	color:			{ type: String },
	transmission:	{ type: String },
	location:		{ type: String, required: true },
	licensePlate: 	{ type: String },
	mileage: 		{ type: Number },
	isSwappable: 	{ type: Boolean },
	description: 	{ type: String }
});


module.exports = mongoose.model('Car', CarSchema);