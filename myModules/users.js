var users = [
	{
		id : "guest",
		password : "123456",
		type : "admin",
		calc : "0"
	},
	{
		id : "admin",
		password : "admin",
		type : "admin",
		calc : "0"
	},
	{
		id : "308209287",
		password : "barak",
		type : "admin",
		calc : "0"
	}
];

function find(id){
	for (var i = 0; i < users.length; i++) {
		if( users[i].id == id ){
			return users[i];
		}
	}
	return null;
}

module.exports = {
	login : function(id, pass){
		var user = find(id);
		if(user){
			return user.password == pass;
		}
		return false;
	},
	getCalc : function(id){
		var user = find(id);
		if(user){
			return user.calc;
		}
		throw new Error('user does not exist');
	},
	setCalc : function(id, data){
		var user = find(id);
		if(user){
			user.calc = data;
		} else {
			throw new Error('user does not exist');
		}
	} 
}