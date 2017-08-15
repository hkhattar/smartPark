var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotSchema = new mongoose.Schema({
	
	_user: {type:Schema.Types.ObjectId, ref: 'User'},
	f_name: {type:String},
	l_name: {type:String},
	success:{type:Boolean, default: false},
	contact:{type:Number},
	street:{type:String},
	house_number:{type:Number},
	city:{type:String,default: 'San Francisco'},
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
	available:{type:Boolean},
	_renters:[{type:Schema.Types.ObjectId, ref: 'User'}],
	
});

mongoose.model('Spot',SpotSchema); //attaches the Spot constant variable to mongoose


