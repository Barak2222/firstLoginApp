var users = require('./../myModules/users');

module.exports = {
	set: function(req, res){
		users.setCalc(req.session.currentUser, req.params.num);
	},
	get: function(req, res){
		var data = users.getCalc(req.session.currentUser);
		res.json(data);
	}
}