console.log('park server spot.js controller')

var mongoose = require('mongoose');
var axios = require('axios');

var Spot = mongoose.model('Spot');

var User = mongoose.model('User')

module.exports = {
	index_spots: function(req,res){

    	console.log("dashboard function sever controller users")

    	  var spots = 'hi';
    	  Spot.find({ //attempt to find a user in the DB based on the entered email address
						
					}, (err, data) => {
					if (err) { //if an error is returned...
						console.log('131');
					} else { //if there is no error...
						if (data) { //and a user is returned (data is not null)...
							
							
							console.log('spots1',spots)
							spots = data
							console.log('spots2',spots)
							// res.render('dashboard',{users:users})
							res.json(spots)

				
								  }
							};
						})
			// var users = User.find({})

    	// console.log('users3',users)
    	// res.render('dashboard',{user:'123'})


    },
	create: function(req,res)
	{
		console.log('inside spot create server controller')
		console.log('POST DATA',req.body);
		// console.log('helo')

		
        // axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        //   params:{
        //   address: req.body.spot,
        //   key: 'AIzaSyBgKwURsd4XhAq0GBTGTDOToFu1S_lFwkk'
        //   } // end of params
        // })// end of axios.get
        // .then(function(response)
        // {
        //   //log full response
        //   // callback(response)
          
        //   console.log(response.data.results[0].formatted_address,'response')
        //   var lat = response.data.results[0].geometry.location.lat;
        // 	var lng = response.data.results[0].geometry.location.lng;
        // 	console.log(lat,lng)
        // })

        // console.log('address*******************', address)

		User.findOne({_id:req.body.user._id},function(err,user){
			var spot = new Spot({contact:req.body.spot.contact,street:req.body.spot.street, house_number:req.body.spot.house_number,license:req.body.spot.license, zip_code:req.body.spot.zip_code, type_of_space:req.body.spot.type_of_space, number_of_spaces:req.body.spot.number_of_spaces,owner_vehicle_choice:req.body.spot.owner_vehicle_choice, instructions:req.body.spot.instructions, start_date:req.body.spot.start_date, end_date:req.body.spot.end_date, start_time:req.body.spot.start_time, end_time:req.body.spot.end_time, license:req.body.spot.license, lat:req.body.lat, lng:req.body.lng, });
			spot._user = user._id;
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
			// console.log('error', err);
		})

	},

	zip_code: function(req,res){
		Spot.find({zip_code:req.body.zip_code},function(err,result){
			console.log('result*********************',result)
			res.json(result);
		})
		// .populate('_renters').exec(function(err,spot){
			// console.log('error', err);
		// })

	},

}//end off module.exports
