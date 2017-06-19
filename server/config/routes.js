var users = require('../controllers/users.js')//we can get functions from friends
module.exports = function(app){
	app.get('/', function(req, res) {
		// console.log('/users')
   		users.index(req,res)
    
	});

	app.post('/register', users.register);

}