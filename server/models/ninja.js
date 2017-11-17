var mongoose = require('mongoose');

var ninjaSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
	belt: { type: String, required: '{PATH} is required!'},
	rate: { type: Number, default: 100},
	available:{type:Boolean, default:false},
	thumb: { type: String, default: null }
});


module.exports = mongoose.model('Ninja', ninjaSchema);