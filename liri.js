require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv[2];
var input2 = "";

// song search so that the user doesn't need to use quotes
for (var i = 3; i < process.argv.length; i++) {
	input2 += process.argv[i]+" ";
};

// twitter display
if (input === "my-tweets"){
	client.get('statuses/user_timeline', function(error, tweets, response) {
  		if(error){
  			console.log(error);
  		};
  		// console.log(tweets);  // The favorites. 
  		// console.log(response);  // Raw response object. 
  		for (var j = 0; j < 20; j++) {
  			if (tweets[j] == undefined) {
  				break
  			} else {
  				console.log("---------------------\n");
  				var tweeter = tweets[j].user.name;
  				var text = tweets[j].text;
  				var when = tweets[j].created_at;
  				console.log(tweeter+": "+text);
  				console.log(when+"\n");
  			}
  		}
	});
};

// spotify function
function spotifySearch(){
	spotify.search({ type: 'track', query: input2, limit:1 }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  		// console.log(data.tracks.items[0]);
  		console.log("---------------------\n");
 		// artist
 		var artist = data.tracks.items[0].artists[0].name;
		console.log(artist); 
		// Song Name
		var song = data.tracks.items[0].name;
		console.log(song);
		// // album
		var album = data.tracks.items[0].album.name;
		console.log(album);
		// // Link
		var preview = data.tracks.items[0].external_urls.spotify;
		console.log(preview);
		console.log("\n---------------------");
	});
};

// random
if (input = "do-what-it-says"){
	fs.readFile("random.txt","utf8", function(err, data){
		if(err){
			return console.log(error);
		};
		// console.log(data);
		var dataArr = data.split(",");
		// console.log(dataArr[1]);
		input2 = dataArr[1];
		// console.log(input2);
		spotifySearch();
	});
};
// Spotify song search
if(input === "spotify-this-song"){
	spotifySearch();
};

// omdb request
if (input === "movie-this"){
	var noInput = "mr nobody";
	if (!process.argv[3]){
		movie = noInput;
	} else {
		movie = input2;
	};
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl,function(err,response,body){
		if (!err && response.statusCode === 200) {
			// console.log(JSON.parse(body));
			console.log("---------------------\n");
			var movTitle = JSON.parse(body).Title;
			console.log("Title: "+movTitle);
			var movYear = JSON.parse(body).Year;
			console.log("Year: "+movYear);
			var imdbRating = JSON.parse(body).Ratings[0].Value;
			console.log("IMDB Rating: "+imdbRating);
			var rtRating = JSON.parse(body).Ratings[1].Value;
			console.log("Rotten Tomatoes Score: "+rtRating);
			var produced = JSON.parse(body).Country;
			console.log("Country: "+produced);
			var movLang = JSON.parse(body).Language;
			console.log("Language: "+movLang);
			var movPlot = JSON.parse(body).Plot;
			console.log("Plot: "+movPlot);
			var actors = JSON.parse(body).Actors;
			console.log("Actors: "+actors);
			console.log("\n---------------------");
  		}
	});
};
