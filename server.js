// Require the Express Module
var express = require('express');
// Require path
var path = require('path');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
// var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
// new code:
var session = require('express-session');
// original code:

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


var routes_setter = require('./server/config/routes.js')
routes_setter(app);

// Setting our Server to Listen on Port: 8000
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
