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

	Spot.findOne({_id:req.params.id},function(err,spot)
	{
		User.findOne({_id:req.body.user._id},function(err,user){
			
			//price calculation
			var date1 = new Date(req.body.renter.start_date);
			var date2 = new Date(req.body.renter.end_date);
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			var price = (diffDays+1) * 6;
			user.contact = req.body.renter.contact;
			user.license_plate = req.body.renter.license_plate;
			user.type_of_car = req.body.renter.type_of_car;
			user._rent_spots.push(spot);
			spot._renters.push(user);
			spot.available = 0;
			user.save(function(err)
			{
				spot.save(function(err)
				{
						if(err) {
							console.log(error);
						}
						else {	
							client.sendMessage({
								to:'+' + spot.contact,
								from:'+18587804791',
								body: user.f_name + ' booked your spot. Contact-  ' + req.body.renter.contact + ' License Plate- ' + req.body.renter.license_plate

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

							client.sendMessage({
								to:'+' + req.body.renter.contact,
								from:'+18587804791',
								body: 'You booked '+ spot.f_name + ' spot. Contact-  ' + spot.contact 

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
							var response = {}
							response.f_name = spot.f_name;
							response.l_name = spot.l_name;
							response.contact = spot.contact;
							response.street = spot.street;
							response.house_number = spot.house_number;
							response.instructions = spot.instructions;
							response.price = price
							console.log('user saved',user.f_name)
							res.json(response);
						}
					
					

				})//end of spot.save
				
			})//end of user.save

		}) //end of Spot.findone

		}) //end of User.findOne
	

	
	}, // end of create
	

}//end off module.exports
