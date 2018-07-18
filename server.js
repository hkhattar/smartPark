// Require the Express Module
var express = require('express');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
// Require path
var path = require('path');
// Create an Express App
var app = express();
// var bcrypt = require('bcrypt');
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var axios = require('axios')
// new code:
var session = require('express-session');
// var moment = require('moment');
// var accountSid = 'PN2771eecd9f277e0cd2f94858aa126764'; // Your Account SID from www.twilio.com/console
  // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
// var twilio = require('twilio')('PN2771eecd9f277e0cd2f94858aa126764','28bd31638cb4b1416f568d25fb76f913')
// original code:
app.use(cookieParser());
// more new code:
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.use(bodyParser.json());

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

app.get('/testtwilio', function(req,res)
{
	client.sendMessage({
		to:'+16692240110',
		from:'+18587804791',
		body:'hello twilio'

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
	
	
})


var routes_setter = require('./server/config/routes.js')
routes_setter(app);

// Setting our Server to Listen on Port: 8019
app.listen(8019, function() {
    console.log("listening on port 8019 smart park");
})

/*************Creates variables from node_modules -- same as var ____ = require('_____') but in ES6**********/


// import express from 'express';
// import path from 'path';
// import bp from 'body-parser';
// import session from 'express-session';
// /***************End imports****************/

// const app = express(), //creates app variable to store the object returned by express when invoked
// 	port = 8000; //variable for the port

// app.use(bp.json()); //sets body-parser to return json (effectively sets up api)
// app.use(express.static(path.join(__dirname, './client'))); //creates a static path to client
// app.use(express.static(path.join(__dirname, './client/bower_components'))); //creates a static path for bower_components
// app.use(session({ //configuration for session
// 	secret: 'keyboard cat',
// 	resave: true,
// 	saveUninitialized: true,
// 	cookie: {
// 		secure: false
// 	}
// }));

// require('./server/config/mongoose'); //imports mongoose.js
// require('./server/config/routes')(app); //imports (and invokes) routes.js AFTER importing mongoose and passes it the app variable

// app.listen(port, () => { //sets up server to listen on port 8000 (or whatever is stored in port variable) and console logs the port value
// 	console.log('------------------');
// 	console.log(`-------${port}-------`);
// 	console.log('------------------');
// });
