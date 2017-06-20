


console.log('park server controller')

var mongoose = require('mongoose');

var User = mongoose.model('User');


module.exports = {

	index: function(req,res){
	
    	console.log("index function sever controller users")
    	res.render('index')
    },

    dashboard: function(req,res){

    	console.log("dashboard function sever controller users")
    	res.render('dashboard')


    },


	register: (req, res) =>{
		console.log('inside register user server controller')
		console.log('POST DATA',req.body);

		var success = true

		
		var user = new User({f_name:req.body.f_name, l_name:req.body.l_name, email:req.body.email, 
			password:req.body.password, contact: req.body.contact, street:req.body.street, 
			house_number:req.body.house_number, city:req.body.city, state: req.body.state, 
			country: req.body.country, zip: req.body.zip});
		console.log('user_id',user.id)
		user.save(function(err,data){
		
			if(err){
				console.log('ERR', err)
				success = false
			}
			else{
				 // res.json({
     //            _id: user._id
     //        	})

     			req.session.user = data; //create a session variable to store the returned data (new user)
     			res.cookie('dash_user', data);
				req.session.save(err2 => { //save session
					if (err2) 
					{ //if there's an error upon saving session...
						console.log(err2);
					} //req.session.save if
									     });
				// res.json(success)
				// _id: newuser._id
				console.log('json*****',data)
				console.log('req.session.user',req.session.user)
				res.redirect('/dashboard')
			}

		})

		
	},
		login: (req, res) => { //logs user in based on entered login information
			
			console.log('req.body',req.body)
			User.findOne({ //uses entered email to search for user in DB
				email: req.body.email
			}, (err, data) => {
				if (err) { //if an error is thrown (model validations, etc)...
					res.json(err); //return error to client-side
				} else { //if there is no error...
					if (!data) { //but no user information is retrieved...
						res.json({
							'errorsFront': ["Email or password incorrect"] //return this error to client-side
						});
					} else { //if user information IS retrieved...
						console.log('req.body.password',req.body.password)
						console.log('data.password',data.password)
						if (req.body.password === data.password) { //assuming the password entered matches that in the DB for that user...
							res.cookie('dash_user', data);
							
						
							res.json(data); //return the user information to client-side
						} else { //if password entered does NOT match that as retrieved from the DB...
							res.json({ //return this error to client-side
								'errorsFront': ["Email or Password incorrect"]
							});
						// } //password no matchy else
					} //if user information is retrieved else
				} //if there is no error when searching for user else
			}
			}); //User.findOne
		},

	


}