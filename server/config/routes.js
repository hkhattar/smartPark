var users = require('../controllers/users.js')//we can get functions from friends
module.exports = function(app){
	app.get('/', function(req, res) {
		// console.log('/users')
   		users.index(req,res)
    
	});

	app.post('/register', users.register);

	app.post('/login', users.login);

	app.get('/users', function(req,res){
		users.dashboard(req,res)
	});

	app.get('/checksesh', users.checkSesh); //checks to see if session exists (is user logged in?)

}