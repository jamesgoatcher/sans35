var mongoose 		= require('mongoose');

var userSchema	= mongoose.Schema({
	  firstName: 	  String,
	  lastName:  		String,
	  weddingMonth: String,
	  weddingDate:  Number,
	  userName: 		{ type: String, unique: true },
	  password: 		String || Number
});

module.exports  = mongoose.model('User', userSchema);