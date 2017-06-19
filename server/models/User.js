


console.log('park.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var UserSchema = new mongoose.Schema({
	
	
	email:{type:String},
	password:{type:String},
	
	
});



mongoose.model('User',UserSchema); //attaches the User constant variable to mongoose


