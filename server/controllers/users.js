console.log('park server controller')
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Spot = mongoose.model('Spot');
module.exports = {
	index: function(req,res) {
    	res.render('index')
    },
    dashboard: function(req,res) {
    	  var users = 'hi';
    	  User.find({ //attempt to find a user in the DB based on the entered email address	
					}, (err, data) => {
							if (err) { //if an error is returned...
								console.log('131');
							} else { //if there is no error...
								if (data) { //and a user is returned (data is not null)...
									users = data
									res.json(users)
								}
							};
						})

    },
	register: (req, res) =>{
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
							user.save(function(err,data) {
								if(err){
									console.log('ERR', err)
										}
								else
								{
				     				req.session.user = data; //create a session variable to store the returned data (new user)
				     				res.cookie('dash_user', data);
									req.session.save(err2 => { //save session
										if (err2) 
										{ //if there's an error upon saving session...
											console.log(err2);
										} //req.session.save if
													     });
									res.json(data)
								
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
			console.log('Cookies: ', req.cookies.dash_user);

		},

	logout: (req, res) => { //logs user out
		res.clearCookie('dash_user');
		// res.redirect('/index'); //redirects user to root
		console.log('logout')
		res.redirect('/#/sign_up');
	},


}
