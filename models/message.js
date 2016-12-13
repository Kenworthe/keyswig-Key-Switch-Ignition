var mongoose = require('mongoose');
var User = require('./user.js');

var MessageSchema = new mongoose.Schema({
	sender: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	receiver: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	content: 	{ type: String }
	},
	{ timestamps: true }
);

MessageSchema.methods.edit = function(content){
	this.content
};

module.exports = mongoose.model('Message', MessageSchema);