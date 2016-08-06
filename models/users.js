var mongoose 		= require('mongoose');

var userSchema	= mongoose.Schema({
	  firstNameOne: 	  String,
	  lastNameOne:  		String,
	  firstNameTwo: 		String,
	  lastNameTwo:  		String,
	  email: 						{ type: String, unique: true },
	  password: 				String || Number
});

module.exports  = mongoose.model('User', userSchema);