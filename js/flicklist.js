

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "df619b789f9d89a9563d8b26c4ef41dc" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
	console.log('started render');
  // TODO 7
  // clear everything from both lists
  $("#section-watchlist ul").empty();
  $("#movie_list ul").empty();
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  
  model.watchlistItems.forEach(function(movie, index) {
  	console.log(movie);
  	var listitem = $('<li></li>');
  	var movieTitle = $('<p></p>').text(movie);
  	$("#section-watchlist ul").append(movieTitle);
  });
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
  	var listitem = $('<li></li>');
  	var movieTitle = $('<p></p>').text(movie.title);
		// insert a list item into the <ul> in the browse section
		// TODO 4
		listitem.append(movieTitle);
		// the list item should include a button that says "Add to Watchlist"
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		var $mybutton = $("<button></button>").text("Add to Watchlist");
		$mybutton.click(function(event) {
			console.log('click ' + movie.title);
			model.watchlistItems.push(movie.title);
			render();
		})
		
		listitem.append($mybutton);
		
		$('#movie_list ul').append(listitem);
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

