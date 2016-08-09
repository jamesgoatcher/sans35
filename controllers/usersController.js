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
			console.log(user + ' Added')
			req.session.email = user.email;
			res.send(user);
		} else {
			console.log('Error adding user')
			res.send(user);
		}
	});
});

//LOG IN route
router.post('/login', function(req, res) {
	User.findOne( {email: req.body.email}, function(err, foundUser){
		if(foundUser && bcrypt.compareSync(req.body.password, foundUser.password)){
			req.session.email = foundUser.email;
			console.log('sign in successful')
			res.send(foundUser);
		} else {
			console.log('password incorrect')
			res.send('password incorrect');
		}
	})
});

//LOG OUT route
router.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		console.log('user logged out')
		res.redirect('/')
	})
});

// //ADMIN route
// router.get('/:id', function(req, res) {
// 	User.find({}, function(err, users) {
// 		var userMap = {};

// 		users.forEach(function(userall) {
// 			userMap[userall.email] = userall;
// 		});

// 		res.send(userMap);
// 	});
// });







module.exports 	= router;