"ddd";

$('form').on('submit', function(e){
	e.preventDefault();
	var form = $(this);
	var userData = form.serialize();

	$.ajax({
		type: 'POST',
		url: '/login',
		data: userData,
	}).done(function(dataRecieved){
		console.log(dataRecieved);
		console.log(dataRecieved);
		if(dataRecieved){
			window.location.href = "/authRequired/profile.html";
		} else {
			window.location.href = "/public/accessDenied.html";
		}
		form.trigger('reset');
	})
	.fail(function(data){
		window.location.href = "/public/accessDenied.html";
	});
});