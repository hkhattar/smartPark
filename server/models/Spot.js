


console.log('park.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var SpotSchema = new mongoose.Schema({
	
	
	_user: {type:Schema.Types.ObjectId, ref: 'User'},
	success:{type:Boolean, default: false},
	contact:{type:Number},
	street:{type:String},
	house_number:{type:Number},
	city:{type:String},
	state:{type:String},
	country:{type:String},
	zip_code:{type:String},
	type_of_space: {type:String},
	number_of_spaces: {type: Number},
	owner_vehicle_choice: {type:String},
	instructions:{type:String},
	start_date:{type:Date},
	end_date:{type:Date},
	start_time:{type:Date},
	end_time:{type:Date},
	lat:{type:Number},
	lng:{type:Number}
	// entry_time:{}
	
	
});



mongoose.model('Spot',SpotSchema); //attaches the User constant variable to mongoose


