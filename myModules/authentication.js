var currentUser = null;

var auth = {
	try: function(user){
		if(user.username == "user1" && user.password == "pass1"){
			currentUser = user.username;
			return true
		}
		return false;
	},

	middleAuth: function(req, res, next){
		if(auth.current()){
			next();
		} else {
			res.redirect('/public/accessDenied.html');
		}
	},
	current: function(){
		return currentUser;
	}
}

module.exports = auth;