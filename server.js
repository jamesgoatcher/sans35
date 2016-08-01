//Server variables
var express 		= require('express'),
		app					= express(),
		mongoose		= require('mongoose'),
		bcrypt			= require('bcrypt'),
		session			= require('express-session'),
		bodyParser	= require('body-parser');

app.use(session({
	secret: 'Machiavelli',
	resave: false,
	saveUninitialized: false
}));

//DB Variables
var port 				= process.env.PORT || 3000;
var mongoDBURI 	= process.env.MONGODB_URI || 'mongodb://localhost:27017/sans35';

mongoose.connect(mongoDBURI);

//Body-Parser requirements
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

//Public files
app.use(express.static('public'));

var usersController = require('./controllers/usersController');
app.use('/users', usersController);

//Catch all redirect
app.get('*', function(req, res){
	res.redirect('/');
});

//Mongo console.log
mongoose.connection.once('open', function(){
	console.log('Welcome, Jimmy!')
});

//Port
app.listen(port, function(){
	console.log('Port active');
});



