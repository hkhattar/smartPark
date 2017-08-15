var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	
	success:{type:Boolean, default: false},
	f_name:{type:String},
	l_name:{type:String},
	email:{type:String},
	password:{type:String},
	contact:{type:Number},
	street:{type:String},
	house_number:{type:Number},
	city:{type:String},
	state:{type:String},
	country:{type:String},
	zip_code:{type:String},
	address:{type:String},
	license_plate:{type:String},
	type_of_car:{type:String},
	_spots:[{type:Schema.Types.ObjectId, ref: 'Spot'}],
	_rent_spots:[{type:Schema.Types.ObjectId, ref: 'Spot'}],
	
});

mongoose.model('User',UserSchema); //attaches the User constant variable to mongoose


