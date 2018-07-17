


console.log('park server controller')

var mongoose = require('mongoose');

var User = mongoose.model('User');

var Spot = mongoose.model('Spot');
// var bcrypt = require('bcrypt');



module.exports = {


	index: function(req,res){
	
    	console.log("index function sever controller users")
    	res.render('index')
    },

    dashboard: function(req,res){

    	console.log("dashboard function sever controller users")

    	  var users = 'hi';
    	  User.find({ //attempt to find a user in the DB based on the entered email address
						
					}, (err, data) => {
					if (err) { //if an error is returned...
						console.log('131');
					} else { //if there is no error...
						if (data) { //and a user is returned (data is not null)...
							
							
							console.log('users1',users)
							users = data
							console.log('users2',users)
							// res.render('dashboard',{users:users})
							res.json(users)

				
								  }
							};
						})
			// var users = User.find({})

    	// console.log('users3',users)
    	// res.render('dashboard',{user:'123'})


    },


	// register: (req, res) =>{
	// 	console.log('inside register user server controller')
	// 	console.log('POST DATA',req.body);

	// 	var success = true
		
	// 		  //    User.findOne({ //attempt to find a user in the DB based on the entered email address
	// 				// 	u_name: req.body.u_name
	// 				// }, (err, data) => {
	// 				// if (err) { //if an error is returned...
	// 				// 	console.log('131');
	// 				// } else { //if there is no error...
	// 				// 	if (data) { //and a user is returned (data is not null)...
							
	// 				// 		error = {already_username: 'Username already exists, please select another one'};
	// 				// 		console.log('error.already_username',error.already_username)
	// 				// 		res.json(error.already_username);
				
	// 				// 			  }
	// 				// 		};
	// 				// 	})
		
	// 	var user = new User({success: true,f_name:req.body.f_name, l_name:req.body.l_name,  email:req.body.email, 
	// 		password:req.body.password, contact: req.body.contact, street:req.body.street, 
	// 		house_number:req.body.house_number, city:req.body.city, state: req.body.state, 
	// 		country: req.body.country, zip: req.body.zip});

	// 	console.log('user_id',user.id)

	// 	var error = {}// error object, it will have all the key value pairs
	// 	error = {message: 'all fields are required'}

	// 	console.log('error',error)

	

	// 	var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$///regex to test email against
	// 	var pwordRegex =
 //      /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/><.;,])(?!.*\s).*$/; //regex to test password against
		
	// 	if(req.body.f_name.length < 1)
	// 	{
	// 	    error = {first: 'First name required',success: false};
	// 	    console.log('error.first',error.first)
	// 	    res.json(error)
		          
	// 	}
	// 	else if (req.body.f_name < 2)
	// 	{
	// 		error = {first: 'Invalid first name',success: false}
	// 		console.log('error.first',error.first)
	// 		res.json(error)
	// 	}
	// 	else if(req.body.l_name.length < 1)
	// 	{
	// 	    error = {last: 'Last name required',success: false};
	// 	    console.log('error.last',error.last)
	// 	    res.json(error)
		          
	// 	}
	// 	else if (req.body.l_name < 2)
	// 	{
	// 		error = {last: 'Invalid last name',success: false}
	// 		console.log('error.last',error.last)
	// 		res.json(error)
	// 	}
	// 	// else if(req.body.u_name.length < 4)
	// 	// {
	// 	//     error = {user: 'Username should be at least 4 characters long'};
	// 	//     console.log('error.user',error.user)
	// 	//     res.json(error)
		          
	// 	// }
	
	// 	// else if (req.body.u_name.length > 3)
	// 	// {
	// 	// 	     console.log('inside else if u_name > 3')
	// 	// 	     User.findOne({ //attempt to find a user in the DB based on the entered email address
	// 	// 				u_name: req.body.u_name
	// 	// 			}, (err, data) => {
	// 	// 			if (err) { //if an error is returned...
	// 	// 				console.log('131');
	// 	// 			} else { //if there is no error...
	// 	// 				if (data) { //and a user is returned (data is not null)...
							
	// 	// 					error = {already_username: 'Username already exists, please select another one'};
	// 	// 					console.log('error.already',error.already)
	// 	// 					res.json(error.already_username);
				
	// 	// 						  }
	// 	// 					};
	// 	// 				})
	// 	// }

	// 	else if(req.body.email.length < 1)
	// 	{
	// 		console.log('132');
	// 	    error = {email: 'Email required',success: false};
	// 	    console.log('error.email',error.email)
	// 	    res.json(error)
		          
	// 	}
		
	// 	else if (!req.body.email.match(emailRegex)) { //if the email entered does not match regex...
 //          error = {email: 'Invalid email'};
 //          console.log('error.email',error.email)



 //          res.json(error)

 //        }

 //        else if(req.body.password.length < 1)
	// 	{
	// 		console.log('132');
	// 	    error = {password: 'Password required',success: false};
	// 	    console.log('error.password',error.password)
	// 	    res.json(error)
		          
	// 	}

 //        // else if (req.body.email.match(emailRegex)) { //if the email entered does match regex...
          
 //        // 	console.log('inside else if email match regex')
 //     //      User.findOne({ //attempt to find a user in the DB based on the entered email address
	// 				// 	email: req.body.email
	// 				// }, (err, data) => {
	// 				// if (err) { //if an error is returned...
	// 				// 	console.log('131',err);
	// 				// } else { //if there is no error...
	// 				// 	if (data) { //and a user is returned (data is not null)...
	// 				// 		console.log(")))))))))))))))))))))))))))))))))))))))")
	// 				// 		error = {already: 'Email already exists, please log in'};
	// 				// 		console.log('error.already',error.already)
	// 				// 		res.json(error.already);
				
	// 				// 			  }
	// 				// 		};
	// 				// 	})

          

 //        // }

 //        // else if (!req.body.password.match(pwordRegex)) { //if the password entered does not match regex...
 //        //   error = {password: 'Password does not meet minimum requirements:Must be at least 8 characters in length and include at least 1 lowercase and 1 uppercase letter, 1 number, and 1 special character' }
 //       	// 	console.log('error.email',error.email)
 //       	// 	res.json(error)
 //        // }
 //        else{
 //        		if (req.body.password.match(pwordRegex)) {
 //        			User.findOne({ //attempt to find a user in the DB based on the entered email address
	// 					email: req.body.email
	// 				}, (err, data) => {
	// 				if (err) { //if an error is returned...
	// 					console.log('131',err);
	// 				} else { //if there is no error...
	// 					if (data) { //and a user is returned (data is not null)...
	// 						console.log(")))))))))))))))))))))))))))))))))))))))")
	// 						error = {already: 'Email already exists, please log in',success: false};
	// 						console.log('error.already',error.already)
	// 						res.json(error.already);
				
	// 							  }
	// 							  else{
	// 							  				user.save(function(err,data){
		
	// 											if(err){
	// 												console.log('ERR', err)
	// 												success = false
	// 											}
	// 											else{
	// 												 // res.json({
	// 								     //            _id: user._id
	// 								     //        	})

	// 								     			req.session.user = data; //create a session variable to store the returned data (new user)
	// 								     			// res.cookie('dash_user', data);
	// 												req.session.save(err2 => { //save session
	// 													if (err2) 
	// 													{ //if there's an error upon saving session...
	// 														console.log(err2);
	// 													} //req.session.save if
	// 																	     });
	// 												// res.json(success)
	// 												// _id: newuser._id
													

	// 												console.log('json*****',data)
	// 												console.log('req.session.user',req.session.user)
	// 												// res.redirect('/dashboard')
	// 												res.json(data)
	// 											}

	// 										})// end of user save
	// 																  }
	// 						};
	// 					})

 //        		}
 //        		else{
 //        			error = {password: 'Password does not meet minimum requirements:Must be at least 8 characters in length and include at least 1 lowercase and 1 uppercase letter, 1 number, and 1 special character',success: false }
 //       				console.log('error.email',error.email)
 //       				res.json(error)
 //        		}


     

 //        }// end of else 
		

		
	// },

	register: (req, res) =>{
		console.log('inside register user server controller')
		console.log('POST DATA',req.body);
		var success = false
		
		// console.log('user_id',user.id)
		// var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(
		// 			8)); //hash the password
		
		User.findOne({ //attempt to find a user in the DB based on the entered email address
						email: req.body.email
					}, (err, data) => {
					if (err) { //if an error is returned...
						console.log('131',err);
					} else { //if there is no error...
						if (data) { //and a user is returned (data is not null)...
							console.log(")))))))))))))))))))))))))))))))))))))))")
							error = {already: 'Email already exists, please log in',success: success};
							console.log('error',error)
							res.json(error);
				
								  }

						else{
							success = true


							// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
       //  					if(err) return next(err);
 
       //  					bcrypt.hash(req.body.password, salt, function(err, hash){
       //      				if(err) return next(err);
 
       //      				})
       //  					})


							var user = new User({success:success,f_name:req.body.f_name,l_name:req.body.l_name,email:req.body.email,password:req.body.password});
							user.save(function(err,data){
		
								if(err){
									console.log('ERR', err)
										}
								else
								{
					
				     				req.session.user = data; //create a session variable to store the returned data (new user)
				     				console.log('data',data)
				     				res.cookie('dash_user', data);
				     			
									req.session.save(err2 => { //save session
										if (err2) 
										{ //if there's an error upon saving session...
											console.log(err2);
										} //req.session.save if
													     });
									res.json(data)
									// _id: newuser._id
									console.log('json',data)
									console.log('req.session.user',req.session.user)
								
								}

							})//end of user save	

							}// end of else , if email is not present in the database
		

		
						}//end of if there is not error
				})//end of user.find one
	},
		// login: (req, res) => { //logs user in based on entered login information
			
		// 	var success = true
		// 	console.log('req.body',req.body)
		// 	User.findOne({ //uses entered email to search for user in DB
		// 		email: req.body.email
		// 	}, (err, data) => {
		// 		if (err) { //if an error is thrown (model validations, etc)...
		// 			res.json(err); //return error to client-side
		// 		} else { //if there is no error...
		// 			if (!data) { //but no user information is retrieved...
		// 				success = false
		// 				res.json({
		// 					success
		// 					// 'errorsFront': ["Email or password incorrect"] //return this error to client-side
		// 				});
		// 			} else { //if user information IS retrieved...
		// 				console.log('req.body.password',req.body.password)
		// 				console.log('data.password',data.password)
		// 				if (req.body.password === data.password) { //assuming the password entered matches that in the DB for that user...
		// 					res.cookie('dash_user', data);
		// 					req.session.user = data
		// 					// res.redirect('/dashboard')
		// 					res.json(data)

		// 					// res.json(data); //return the user information to client-side
		// 				} else { //if password entered does NOT match that as retrieved from the DB...
		// 					success = false
		// 					res.json({ //return this error to client-side
		// 						success
		// 					});
		// 				// } //password no matchy else
		// 			} //if user information is retrieved else
		// 		} //if there is no error when searching for user else
		// 	}
		// 	}); //User.findOne
		// },

		login: (req, res) => { //logs user in based on entered login information
			
			var success = true
			console.log('req.body',req.body)
			User.findOne({ //uses entered email to search for user in DB
				email: req.body.email
			}, (err, data) => {
				if (err) { //if an error is thrown (model validations, etc)...
					res.json(err); //return error to client-side
				} else { //if there is no error...
					if (!data) { //but no user information is retrieved...
						success = false
						console.log('success',success)

						res.json({
							'success' : success,
							'errorsFront': ["Email or password incorrect"] //return this error to client-side
						});
						// res.json({success})
					} else { //if user information IS retrieved...
						console.log('req.body.password',req.body.password)
						console.log('data.password',data.password)
						if (req.body.password === data.password) { //assuming the password entered matches that in the DB for that user...
							res.cookie('dash_user', data);
							
							console.log('data+++++++++++++++',data)
							console.log('success',success)

							res.json(data); //return the user information to client-side

						} else { //if password entered does NOT match that as retrieved from the DB...
							success = false
							console.log('success',success)
							// res.json({success})
							res.json({ //return this error to client-side
								'success' : success,
								'errorsFront': ["Email or Password incorrect"]
							});
						// } //password no matchy else
					} //if user information is retrieved else
				} //if there is no error when searching for user else
			}
			}); //User.findOne
		},

	checkSesh: (req, res) =>{ //returns session to client-side (null if it does not exist)
			res.json(req.cookies.dash_user);
			// console.log('session',req.session.user)
			console.log('Cookies: ', req.cookies);

		},

	logout: (req, res) => { //logs user out
		res.clearCookie('dash_user');
		// res.redirect('/index'); //redirects user to root
		console.log('logout')
		res.redirect('/#/sign_up');
	},


}
