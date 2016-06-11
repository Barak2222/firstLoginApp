var express = require('express');
var router = express.Router();

var auth = require('./../myModules/authentication');
var randomQuotes = require('./../myModules/randomQuotes');
var calculator = require('./../myModules/calculator');

router.use(auth.middleAuth)
.post('/setCalc/:num', calculator.set)
.get('/getCalc', calculator.get)
.get('/logout', auth.logout)
.get('/getQuote', randomQuotes)
.get('/getCurrentUser', auth.getCurrentUser)
.use('/', express.static(__dirname + "\\..\\" + 'www\\'));

module.exports = router;