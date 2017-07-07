


console.log('park.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var SpotSchema = new mongoose.Schema({
	
	
	
	success:{type:Boolean, default: false},
	contact:{type:Number},
	street:{type:String, required: true},
	house_number:{type:Number},
	city:{type:String},
	state:{type:String},
	country:{type:String},
	zip_code:{type:String},
	// entry_time:{}
	
	
});



mongoose.model('Spot',SpotSchema); //attaches the User constant variable to mongoose


