


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
    	res.render('dashboard',{user:req.session.user.f_name})


    },


	register: (req, res) =>{
		console.log('inside register user server controller')
		console.log('POST DATA',req.body);

		var success = true
		
			     User.findOne({ //attempt to find a user in the DB based on the entered email address
						u_name: req.body.u_name
					}, (err, data) => {
					if (err) { //if an error is returned...
						console.log('131');
					} else { //if there is no error...
						if (data) { //and a user is returned (data is not null)...
							
							error = {already_username: 'Username already exists, please select another one'};
							console.log('error.already_username',error.already_username)
							res.json(error.already_username);
				
								  }
							};
						})
		
		var user = new User({f_name:req.body.f_name, l_name:req.body.l_name, u_name:req.body.u_name, email:req.body.email, 
			password:req.body.password, contact: req.body.contact, street:req.body.street, 
			house_number:req.body.house_number, city:req.body.city, state: req.body.state, 
			country: req.body.country, zip: req.body.zip});

		console.log('user_id',user.id)

		var error = {}// error object, it will have all the key value pairs
		error = {message: 'all fields are required'}

		console.log('error',error)

	

		var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$///regex to test email against
		var pwordRegex =
      /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/><.;,])(?!.*\s).*$/; //regex to test password against
		
		if(req.body.f_name.length < 1)
		{
		    error = {first: 'First name required'};
		    console.log('error.first',error.first)
		    res.json(error)
		          
		}
		else if (req.body.f_name < 2)
		{
			error = {first: 'Invalid first name'}
			console.log('error.first',error.first)
			res.json(error)
		}
		else if(req.body.l_name.length < 1)
		{
		    error = {last: 'Last name required'};
		    console.log('error.last',error.last)
		    res.json(error)
		          
		}
		else if (req.body.l_name < 2)
		{
			error = {last: 'Invalid last name'}
			console.log('error.last',error.last)
			res.json(error)
		}
		else if(req.body.u_name.length < 4)
		{
		    error = {user: 'Username should be at least 4 characters long'};
		    console.log('error.user',error.user)
		    res.json(error)
		          
		}
	
		// else if (req.body.u_name.length > 3)
		// {
		// 	     User.findOne({ //attempt to find a user in the DB based on the entered email address
		// 				u_name: req.body.u_name
		// 			}, (err, data) => {
		// 			if (err) { //if an error is returned...
						// console.log('131');
		// 			} else { //if there is no error...
		// 				if (data) { //and a user is returned (data is not null)...
							
		// 					error = {already_username: 'Username already exists, please select another one'};
		// 					console.log('error.already',error.already)
		// 					res.json(error.already_username);
				
		// 						  }
		// 					};
		// 				})
		// }

		else if(req.body.email.length < 1)
		{
			console.log('132');
		    error = {email: 'Email required'};
		    console.log('error.email',error.email)
		    res.json(error)
		          
		}
		
		else if (!req.body.email.match(emailRegex)) { //if the email entered does not match regex...
          error = {email: 'Invalid email'};
          console.log('error.email',error.email)



          res.json(error)

        }

     //    else if (req.body.email.match(emailRegex)) { //if the email entered does not match regex...
          

     //      User.findOne({ //attempt to find a user in the DB based on the entered email address
					// 	email: req.body.email
					// }, (err, data) => {
					// if (err) { //if an error is returned...
					// 	console.log('131',err);
					// } else { //if there is no error...
					// 	if (data) { //and a user is returned (data is not null)...
					// 		console.log(")))))))))))))))))))))))))))))))))))))))")
					// 		error = {already: 'User already exists, please log in'};
					// 		console.log('error.already',error.already)
					// 		res.json(error.already);
				
					// 			  }
					// 		};
					// 	})

          

     //    }

        else if (!req.body.password.match(pwordRegex)) { //if the password entered does not match regex...
          error = {password: 'Password does not meet minimum requirements:Must be at least 8 characters in length and include at least 1 lowercase and 1 uppercase letter, 1 number, and 1 special character' }
       		console.log('error.email',error.email)
       		res.json(error)
        }
        else{

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
     			// res.cookie('dash_user', data);
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

		})// end of user save

        }// end of else 
		

		
	},
		login: (req, res) => { //logs user in based on entered login information
			
			console.log('req.body',req.body)
			User.findOne({ //uses entered email to search for user in DB
				u_name: req.body.u_name
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
							req.session.user = data
							res.redirect('/dashboard')

							// res.json(data); //return the user information to client-side
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