var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	borrower: { type: String },
	make: { type: String, required: true },
	model: { type: String, required: true },
	year: { type: Number, required: true },
	licensePlate: { type: String },
	mileage: { type: Number }
});


module.exports = mongoose.model('Car', CarSchema);