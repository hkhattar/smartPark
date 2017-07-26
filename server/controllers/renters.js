console.log('park server renter.js controller')

var mongoose = require('mongoose');
var axios = require('axios');

var Spot = mongoose.model('Spot');

var User = mongoose.model('User')

var accountSid = 'AC78353e9a712677f00a381f97a8d13765'
var authToken = '28bd31638cb4b1416f568d25fb76f913';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

module.exports = {
create: function(req,res)
	{
		console.log('req.body',req.body)
		console.log('req.params',req.params)

	Spot.findOne({_id:req.params.id},function(err,spot)
	{
		User.findOne({_id:req.body.user._id},function(err,user){
			console.log('user______________________',user)
			
			console.log('spot.contact<<<<<<<',spot.contact)
			user.contact = req.body.renter.contact
			user.license_plate = req.body.renter.license_plate
			user.type_of_car = req.body.renter.type_of_car

			user._rent_spots.push(spot);
			// user._rent_spots =  req.params.id

			spot._renters.push(user);
			// spot._renters = req.body.user._id

			// var renter = new User({contact:req.body.renter.contact, license_plate:req.body.renter.license_plate, type_of_car:req.body.renter.type_of_car});
			// renter._rent_spots = req.params.id;

			user.save(function(err)
			{
				spot.save(function(err)
				{
					
						if(err)
						{
							console.log(error);
						}
						else
						{	
							
							client.sendMessage({
								to:'+' + spot.contact,
								from:'+18587804791',
								body:'Is your spot available?'

							}, function(err,data){
								if (err)
									{
										console.log('err',err)
									}
								else
									{
										console.log('res',res)
									}

							})
							console.log('user saved',user)
							res.json(user);
						}
					
					

				})//end of spot.save
				
			})//end of user.save

		}) //end of Spot.findone

		}) //end of User.findOne
	

	
	}, // end of create
	

}//end off module.exports
