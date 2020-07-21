$("#searchButton").on("click", function(event) {
    event.preventDefault();
    clear();
    console.log("I was clicked!");
    searchTerm = $("#userSearchQuery").val();
    const queryURL = "https://deezerdevs-deezer.p.rapidapi.com/search/track?q=" + searchTerm;

    const settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": queryURL,
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		    "x-rapidapi-key": "bd30da6cc8msh4942a58cb2affc9p163855jsn1cfc123ae22b"
	    }
    }

    $.ajax(settings).done(function (musicData) {
        for (let i = 0; i < musicData.data.length; i++) {
            console.log(musicData.data);
            console.log(musicData.data[i].title);
            console.log(musicData.data[i].artist.name);
            console.log(musicData.data[i].album.title);

        // Get specific song information for the current index.
        const song = musicData.data[i];
        
        // Create the list group to contain the songs and add the song details for each.
        const $songList = $("<ul>");
        $songList.addClass("list-group");

        // Add the newly created element to the DOM.
        $("#searchResultsCardBody").append($songList);

        // Log and append the title of the song to $songList.
        const songTitle = song.title;
        const $songListItem = $("<li class='list-group-item songTitle'>");
        
        if (songTitle) {
            $songListItem.append("<strong> " + songTitle + "</strong>");
            }

        // Appends the respective artist name onto the page.
        const artist = song.artist.name;

        if (artist) {
            $songListItem.append("<h5>Artist: " + artist + "</h5>");
        }

        // Appends the name of the album for the song onto the page.
        const album = song.album.title;

        if (album) {
            $songListItem.append("<h5>Album: " + album + "</h5>");
        }

        // Append the songs onto the page.
        $songList.append($songListItem);

        $songList.css({"margin": "10px"});
        $songList.css({"padding-bottom": "20px"});
    }
    });
    });

    // Empties the list of songs from the previous searches.
    function clear() {
        $("#searchResultsCardBody").empty();
    }

    // The on "click" function that is associated with the "delete" button.
    $("#clearButton").on("click", clear);