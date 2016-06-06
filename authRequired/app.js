window.onload = function(){
	elements.init();
	navigation.init();
	calc.create();
	calc.init();
	randomQuote.init();
	user.init();
}

var elements = {
	navDiv: null,
	navBtns: null,
	pages: null,
	calcMain: null,
	calcBtns: new Array(),
	calcScreen: null,

	init: function(){
		this.navDiv = document.getElementById('nav');
		this.navBtns = document.getElementsByClassName("navBtns");
		this.pages = document.getElementsByClassName("page");
		this.calcMain = document.getElementById("calc-main");
		this.calcScreen = document.getElementById("claculator-display");
	}
}

var user = {
	init: function(){
		$('#logout').on('click', user.logout);
		$.getJSON( "/authRequired/getCurrentUser", function( data ) {
  			$('#currentUser').text(data);
		})
		.fail(function(){
			console.log('error while trying to get data from server');
		})
	},
	logout: function(){
		$.getJSON( "/authRequired/logout", function( data ) {
  			console.log(data);
  			if(data == true || data == "true"){
  				window.location.href = "/public/login.html";
  			} else {
  				console.log('error disconnecting');
  				console.log(data);
  			}
		})
		.fail(function(){
			console.log('error while trying to get data from server');
		})
	}
}

var randomQuote = {
	init: function(){
		$.getJSON( "/authRequired/getQuote", function( data ) {
  			$('#randomQuote').text(data);
		})
		.fail(function(){
			console.log('error while trying to get data from server');
		})
	}
}

var navigation = {
	init: function(){
		for (var i = 0; i < elements.navBtns.length; i++) {
			elements.navBtns[i].addEventListener('click', this.handler, false);
		}
	},
 	handler: function(){
		var show;
		if(this.id.indexOf("Profile") > -1){
			show = 0;
		} else if(this.id.indexOf("Calc") > -1){
			show = 1;
		} else if(this.id.indexOf("ReadMe") > -1){
			show = 2;
		}
		for(var i = 0; i < elements.pages.length; i++){
			elements.pages[i].style.display = (i == show) ? "block" : "none";	
		}
	}
}

// CALCULATOR
var calc = {
	buttons: [1, 2, 3, "C", 4, 5, 6, "/", 7, 8, 9, "*", 0, "-", "+", "="],
	currentValue: 0,
	currentResult: null,
	currentTask: null,
	create: function(){
		for(var i = 0; i < this.buttons.length; i++){
			var div = document.createElement("div");
			var btn = document.createElement("button");
			var text = document.createTextNode(this.buttons[i]);

			btn.name = this.buttons[i];
			elements.calcBtns.push(btn);

			div.appendChild(btn);
			btn.appendChild(text);
			elements.calcMain.appendChild(div);
		}
		calc.getValFromServer();
	},
	init: function(){
		for(i = 0; i < elements.calcBtns.length; i ++){
			var e = elements.calcBtns[i];
			e.addEventListener('click', this.btnHandler, false);
		}
	},
	getValFromServer: function(){
		$.getJSON( "/authRequired/getCalc", function( data ) {
  			var current = Number(data);
  			calc.updateResult(current);
		})
		.fail(function(){
			console.log('error while trying to get data from server');
		})
	},
	setValToServer: function(val){
		$.post("/authRequired/setCalc/" + val)
  		.fail(function(data){
			console.log('failed to post to server! ' + data);
		});
	},
	btnHandler: function(e){
		var command = e.target.name;
		if(command >= 0){
			calc.updateCurrentResult(command);
			return ;
		}
		if(command == "C"){
			calc.reset();
			return ;
		}
		if(command == "="){
			if(calc.currentResult == null && calc.currentTask != null){
				calc.reset();
				calc.updateScreen("invalid format");
				return ;
			}
			if(calc.currentResult != null){
				calc.calculate();
			}
			return ;
		}
		if(calc.currentResult != null && calc.currentValue != 0 && calc.currentTask != null){
			calc.calculate();
			calc.currentTask = command;
			return ;
		}
		calc.currentTask = command;
		if(calc.currentValue == 0){
			calc.currentValue = calc.currentResult;
			calc.currentResult = null;
		}
	},
	updateCurrentResult: function(n){
		if(calc.currentResult == null){
			calc.currentResult = 0;
		}
		var temp = calc.currentResult + "";
		temp+= n;
		calc.currentResult = Number(temp);
		calc.updateScreen(calc.currentResult);
	},
	calculate: function(){
		var a = calc.currentValue;
		var b = calc.currentResult;
		switch(calc.currentTask){
			case '+': calc.updateResult(a + b);
				break;
			case '-': calc.updateResult(a - b);
				break;
			case '*': calc.updateResult(a * b);
				break;
			case '/': calc.updateResult(a / b);
				break;
			case null: calc.updateResult(b);
				break;
		}
		calc.currentResult = null;
		calc.currentTask = null;
	},
	reset: function(){
		calc.updateResult(0);
		calc.currentResult = null;
		calc.currentTask = null;
	},

	updateResult: function(num){
		this.updateScreen(num);
		this.currentValue = num;
		this.setValToServer(num);
	},
	updateScreen: function(num){
		elements.calcScreen.value = num;
	}
}