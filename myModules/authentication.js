var users = require('./users')

var auth = {
	login: function(user, session){
		if( users.login(user.username, user.password)){ //user.username == "user1" && user.password == "pass1"){
			session.currentUser = user.username;
			return true;
		}
		return false;
	},
	middleAuth: function(req, res, next){
		if(req.session.currentUser){
			next();
		} else {
			res.redirect('/public/accessDenied.html');
		}
	},
}

module.exports = auth;