

var auth = {
	login: function(user, session){
		if(user.username == "user1" && user.password == "pass1"){
			session.currentUser = user.username;
			//currentUser = user.username;
			return true
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