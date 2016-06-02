var express = require('express');
var app = express();
var auth = require('./myModules/authentication');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});


app.post('/login', parseUrlencoded, function(req, res){
	if (!req.body) return res.sendStatus(400);

	var loginData = req.body;
	console.log(loginData);
	if(auth.try(loginData)){
		res.json("true");
	} else {
		res.status(401).json("false");
	}
});
/**
app.get('/', function(req, res){
	if(auth.current()){
		res.redirect(__dirname + '/authRequired/profile.html'); // {HOW TO DO?}
	} else {
		res.redirect(__dirname + '/public/login.html');
	}
});*/

app.get('/public/:file', function(req, res){
	if(req.params.file){
		res.sendFile(__dirname + '/public/' + req.params.file);
	} else {
		if(auth.current()){
			res.redirect(__dirname + '/authRequired/profile.html');
		} else {
			res.redirect(__dirname + '/public/login.html');
		}
	}
});

app.get('/authRequired/:file', auth.middleAuth, function(req, res){
	res.sendFile(__dirname + '/authRequired/' + req.params.file);
});

app.listen(3000);