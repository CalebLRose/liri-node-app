require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv[2];
var input2 = "";

for (var i = 3; i < process.argv.length; i++) {
	input2 += process.argv[i]+" ";
};

// if (input === "my-tweets"){
// 	client.get('tweets', function(error, tweets, response) {
//   		if(error){
//   			console.log(error);
//   		};
//   		console.log(tweets);  // The favorites. 
//   		// console.log(response);  // Raw response object. 
// });
// };

// Spotify song search
if(input === "spotify-this-song"){
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
}

