console.log('park server spot.js controller')

var mongoose = require('mongoose');
var axios = require('axios');

var Spot = mongoose.model('Spot');

var User = mongoose.model('User')

module.exports = {

	delete: function(req,res){

    	console.log("delete function sever controller users")
    	console.log('POST DATA',req.body)
	Spot.remove({_id: req.body._id}, function(err, spot){
				if(err) {
					console.log(err);
				}
				else {
					res.json(spot);
				}
			})
    },

	index_spots: function(req,res){

    	 Spot.find({ available:1//attempt to find an available Spot in the DB 
					}, (err, data) => {
					if (err) { //if an error is returned...
						console.log('error');
					} else { //if there is no error...
						if (data) { //and a user is returned (data is not null)...
							spots = data
							res.json(spots)
						}
					  };
		})
    },
	create: function(req,res)
	{
		User.findOne({_id:req.body.user._id},function(err,user){
			var spot = new Spot({available:1, contact:req.body.spot.contact,street:req.body.spot.street, house_number:req.body.spot.house_number,license:req.body.spot.license, zip_code:req.body.spot.zip_code, type_of_space:req.body.spot.type_of_space, number_of_spaces:req.body.spot.number_of_spaces,owner_vehicle_choice:req.body.spot.owner_vehicle_choice, instructions:req.body.spot.instructions, start_date:req.body.spot.start_date, end_date:req.body.spot.end_date, start_time:req.body.spot.start_time, end_time:req.body.spot.end_time, license:req.body.spot.license, lat:req.body.lat, lng:req.body.lng, });

			spot._user = user._id;
			spot.f_name = user.f_name
			spot.l_name = user.l_name

//GET DATES ARRAY FROM START DATE TO END DATE
			Date.prototype.addDays = function(days) 
			{
    			var dat = new Date(this.valueOf())
    			dat.setDate(dat.getDate() + days);
    			return dat;
			}

			function getDates(startDate, stopDate) 
			{
    			var dateArray = new Array();
    			var currentDate = startDate;
    			while (currentDate <= stopDate) 
    			{
        			dateArray.push( new Date (currentDate) )
        			currentDate = currentDate.addDays(1);
    			}
    			return dateArray;
			}

			user._spots.push(spot);
			spot.save(function(err)
			{
				user.save(function(err)
				{
					if(err)
					{
						console.log(error);
					}
					else
					{
						res.json(spot);
					}

				})
				
			})
		})
	},


	show_spot: function(req,res){
		Spot.findOne({_id:req.params.id},function(err,result){
			res.json(result);
		})
		.populate('_renters').exec(function(err,spot){
		})

	},

	zip_code: function(req,res){
		var date1 = new Date(req.body.start_date);
		var date2 = new Date(req.body.end_date)
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		var price = diffDays * 6
		Spot.find({$and: [{zip_code:req.body.zip_code},{owner_vehicle_choice:req.body.owner_vehicle_choice},{available:1}]},function(err,result){
			res.json(result);
		})
		.populate('_renters').exec(function(err,spot){
			console.log('error', err);
		})

	},

}//end off module.exports
