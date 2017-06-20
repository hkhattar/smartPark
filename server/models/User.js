


console.log('park.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var UserSchema = new mongoose.Schema({
	
	
	f_name:{type:String},
	l_name:{type:String},
	u_name:{type:String},
	email:{type:String},
	password:{type:String},
	contact:{type:Number},
	street:{type:String},
	house_number:{type:Number},
	city:{type:String},
	state:{type:String},
	country:{type:String},
	zip_code:{type:String},
	
	
});



mongoose.model('User',UserSchema); //attaches the User constant variable to mongoose


