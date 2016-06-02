var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

var auth = require('./myModules/authentication');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});


app.use(session({
	secret: 'keyboard cat',
	cookie: { maxAge: 5000 },
	saveUninitialized: true, // database something
	resave: true, //database stuff
}));

// Access the session as req.session
app.get('/demo', function(req, res, next) {
  	var sess = req.session;
  	console.log(sess);
  	if (sess.views) {
    	sess.views++;
    	res.setHeader('Content-Type', 'text/html')
    	res.write('<p>views: ' + sess.views + '</p>')
    	res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    	res.end()
  	} else {
    	sess.views = 1
    	res.end('welcome to the session demo. refresh!')
  	}
});

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
/**
app.get('/', function(req, res){
	if(auth.current()){
		res.redirect(__dirname + '/authRequired/profile.html'); // {HOW TO DO?}
	} else {
		res.redirect(__dirname + '/public/login.html');
	}
});*/

app.get('/public/:file', function(req, res){
		res.sendFile(__dirname + '/public/' + req.params.file);
});

app.get('/authRequired/:file', auth.middleAuth, function(req, res){
	res.sendFile(__dirname + '/authRequired/' + req.params.file);
});

app.listen(3000);