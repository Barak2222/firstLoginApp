var quotes = [
	"A woman's mind is cleaner than a man's: She changes it more often",
	"The closest a person ever comes to perfection is when he fills out a job application form.",
	"You’ll never be as lazy as whoever named the fireplace."
];

module.exports = function(req, res){
	var i = Math.floor((Math.random() * 3));
	res.json(quotes[i]);
}