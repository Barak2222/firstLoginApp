var express = require('express');
var app = express();
var session = require('express-session');
var router = express.Router();
var auth = require('./myModules/authentication');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var profileRouter = require('./routes/profilePage');

app.use(session({
	secret: 'd390dje89wjd2398dj',
	cookie: { maxAge: 300000 },
	saveUninitialized: true,
	resave: true,
}));

app.get('/', function(req, res){
	res.statusCode = 302;
	res.setHeader('Location', '/public/login.html');
	res.end();
});

app.post('/login', parseUrlencoded, auth.login);
app.use('/www', profileRouter);
app.use('/public/', express.static('public'));

app.listen(80);