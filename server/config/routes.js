var users = require('../controllers/users.js')//we can get functions from friends
var spots = require('../controllers/spots.js')
var renters = require('../controllers/renters.js')

module.exports = function(app){
	app.get('/', function(req, res) {
		// console.log('/users')
   		users.index(req,res)
    
	});

	app.get('/index', function(req, res) {
		// console.log('/users')
   		users.index(req,res)
    
	});

	app.post('/register', users.register);

	app.post('/login', users.login);

	app.get('/users', function(req,res){
		users.dashboard(req,res)
	});

	app.get('/checksesh', users.checkSesh); //checks to see if session exists (is user logged in?)

    app.get('/logout', users.logout); //logs user out

    app.post('/spots', spots.create) ;

    app.get('/spots',spots.index_spots);

    app.post('/renters/:id',renters.create);

    app.get('/spots/:id',spots.show_spot);

    app.post('/zipcode',spots.zip_code);

    app.post('/delete_spot',spots.delete)
}