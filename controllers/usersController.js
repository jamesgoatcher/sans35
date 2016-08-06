//Requires
var express			= require('express'),
		router			= express.Router(),
		bcrypt			= require('bcrypt');

//User model
var User				= require('../models/users');

//SIGN UP route
router.post('/', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.create(req.body, function(err, user) {
		if(user !== undefined){
			console.log(user + 'Added')
			req.session.userName = user.userName;
			res.send(user);
		} else {
			console.log('Error adding user')
			res.send(user);
		}
	});
});

//LOG IN route

//LOG OUT route



module.exports 	= router;