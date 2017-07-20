


console.log('park.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var SpotSchema = new mongoose.Schema({
	
	
	_user: {type:Schema.Types.ObjectId, ref: 'User'},
	owner: {type:String},
	success:{type:Boolean, default: false},
	contact:{type:Number},
	street:{type:String},
	house_number:{type:Number},
	city:{type:String,default: 'San Jose'},
	state:{type:String, default: 'California'},
	country:{type:String, default: 'United States'},
	zip_code:{type:String},
	type_of_space: {type:String},
	number_of_spaces: {type: Number},
	owner_vehicle_choice: {type:String},
	instructions:{type:String},
	start_date:{type:Date},
	end_date:{type:Date},
	start_time:{type:String},
	end_time:{type:String},
	license: {type: String},
	lat:{type:Number},
	lng:{type:Number},
	_renters:[{type:Schema.Types.ObjectId, ref: 'User'}],
	// entry_time:{}
	
	
});



mongoose.model('Spot',SpotSchema); //attaches the User constant variable to mongoose


