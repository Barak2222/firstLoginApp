var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

var auth = require('./myModules/authentication');
var users = require('./myModules/users');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var randomQuotes = require('./myModules/randomQuotes');


app.use(session({
	secret: 'd390dje89wjd2398dj',
	cookie: { maxAge: 300000 },
	saveUninitialized: true,
	resave: true,
}));



app.post('/login', parseUrlencoded, function(req, res){
	if (!req.body) return res.sendStatus(400);
	var sess = req.session;

	var loginData = req.body;
	if(auth.login(loginData, sess)){
		res.json("true");
	} else {
		res.status(401).json("false");
	}
});

app.get('/', function(req, res){
	res.statusCode = 302;
	res.setHeader('Location', '/public/login.html');
	res.end();
});

app.get('/authRequired/getQuote', auth.middleAuth, randomQuotes);
app.get('/authRequired/getCurrentUser', auth.middleAuth, function(req, res){
	res.json(req.session.currentUser);
});
app.get('/authRequired/logout', auth.middleAuth, function(req, res){
	req.session.currentUser = null;
	res.json("true");
});

app.get('/authRequired/getCalc', auth.middleAuth, function(req, res){
	var data = users.getCalc(req.session.currentUser);
	res.json(data);
});

app.post('/authRequired/setCalc/:num', auth.middleAuth, function(req, res){
	users.setCalc(req.session.currentUser, req.params.num);
});

app.get('/public/:file', function(req, res){
		res.sendFile(__dirname + '/public/' + req.params.file);
});

app.get('/authRequired/:file', auth.middleAuth, function(req, res){
	res.sendFile(__dirname + '/authRequired/' + req.params.file);
});

app.listen(3000);