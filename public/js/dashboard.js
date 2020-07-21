// Search function to find song by its title.
$("#songSearchButton").on("click", function (event) {
  event.preventDefault();
  songClear();
  console.log("I was clicked!");
  searchTerm = $("#userSongSearchQuery").val();
  const queryURL =
    "https://deezerdevs-deezer.p.rapidapi.com/search/track?q=" + searchTerm;

  const settings = {
    async: true,
    crossDomain: true,
    url: queryURL,
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "bd30da6cc8msh4942a58cb2affc9p163855jsn1cfc123ae22b",
    },
  };

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
      $("#songSearchResultsCardBody").append($songList);

      // Log and append the title of the song to $songList.
      const songTitle = song.title;
      const $songListItem = $("<li class='list-group-item songTitle'>");

      if (songTitle) {
        $songListItem.append("<h2><strong> " + songTitle + "</strong></h2>");
      }

      // Appends the respective artist name onto the page.
      const artist = song.artist.name;

      if (artist) {
        $songListItem.append("<h4>Artist: " + artist + "</h4>");
      }

      // Appends the name of the album for the song onto the page.
      const album = song.album.title;

      if (album) {
        $songListItem.append("<h4>Album: " + album + "</h4>");
      }

      // Button (to add the song to playlist) is appended.
      const addSongButton = $("<button>");
      addSongButton.text("Add Song");
      addSongButton.attr(
        "class",
        "button is-rounded is-success is-small is-light"
      );
      addSongButton.css({ "margin-right": "10px", float: "right" });
      $songList.append(addSongButton);

      // Append the songs onto the page.
      $songList.append($songListItem);

      $songList.css({ margin: "10px" });
      $songList.css({ "padding-bottom": "20px" });
    }
  });
});

// Empties the list of songs from the previous searches.
function songClear() {
  $("#songSearchResultsCardBody").empty();
}

// The on "click" function that is associated with the "delete" button.
$("#songClearButton").on("click", songClear);

// Search function to find song by the artist's top songs.
$("#artistSearchButton").on("click", function (event) {
  event.preventDefault();
  artistClear();
  console.log("I was clicked!");
  searchTerm = $("#userArtistSearchQuery").val();
  const queryURL =
    "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" +
    searchTerm +
    "&api_key=a2d086840baaf07f39dd4fcf09c18ff7&format=json";

  const settings = {
    url: queryURL,
    method: "GET",
  };

  $.ajax(settings).done(function (artistData) {
    for (let i = 0; i < artistData.toptracks.track.length; i++) {
      console.log(artistData);
      console.log(artistData.toptracks.track[i].name);
      console.log(artistData.toptracks.track[i].artist.name);
      console.log(artistData.toptracks.track[i]["@attr"].rank);

      // Get specific song information for the current index.
      const song = artistData.toptracks.track[i];

      // Create the list group to contain the songs and add the song details for each.
      const $songList = $("<ul>");
      $songList.addClass("list-group");

      // Add the newly created element to the DOM.
      $("#artistSearchResultsCardBody").append($songList);

      // Log and append the title of the song to $songList.
      const songTitle = song.name;
      const $songListItem = $("<li class='list-group-item songTitle'>");

      if (songTitle) {
        $songListItem.append("<h2><strong> " + songTitle + "</strong></h2>");
      }

      // Appends the respective artist name onto the page.
      const artist = song.artist.name;

      if (artist) {
        $songListItem.append("<h4>Artist: " + artist + "</h4>");
      }

      // Appends the rank of the song onto the page.
      const rank = song["@attr"].rank;

      if (rank) {
        $songListItem.append("<h4>Song Rank: " + rank + "</h4>");
      }

      // Button (to add the song to playlist) is appended.
      const addSongButton = $("<button>");
      addSongButton.text("Add Song");
      addSongButton.attr(
        "class",
        "button is-rounded is-success is-small is-light"
      );
      addSongButton.css({ "margin-right": "10px", float: "right" });
      $songList.append(addSongButton);

      // Append the songs onto the page.
      $songList.append($songListItem);

      $songList.css({ margin: "10px" });
      $songList.css({ "padding-bottom": "20px" });
    }
  });
});

// Empties the list of songs from the previous searches.
function artistClear() {
  $("#artistSearchResultsCardBody").empty();
}

// The on "click" function that is associated with the "delete" button.
$("#artistClearButton").on("click", artistClear);

// Variables to set selected playlist
let selectedPlaylistName = $(".playlistListItem:first").text();
console.log(selectedPlaylistName);
let selectedPlaylistId = $(".playlistListItem:first").data("id");
console.log(selectedPlaylistId);
// Event listener for new playlist button
$("#makePlaylistButton").on("click", function () {
    console.log("click!");
    let playlistName = {
        name: $("#newPlaylistName").val(),
        UserId: 1
    }
    $.ajax("/api/playlists", {
        type: "POST",
        data: playlistName
    }).then(function () {
        console.log("created new playlist!");
        location.reload();
    });
});
// Event listener for playlist list item
$(".playlistListItem").on("click", function () {
    console.log("click!");
    let playlistName = $(this).text();
    let playlistId = $(this).data("id");
    selectedPlaylistName = playlistName;
    selectedPlaylistId = playlistId;
    selectPlaylist(selectedPlaylistName, selectedPlaylistId);
});
// Function to select playlist
const selectPlaylist = (name, id) => {
    $("#selectedPlaylist").text(name);
    $("#selectedPlaylist").attr("data-id", id);
    renderPlaylistSongs(id);
};
// Function to show playlist songs
const renderPlaylistSongs = (playlistId) => {
    $("#playlistSongsList").empty();
    $.ajax("/api/playlist/" + playlistId, {
        type: "GET",
        data: playlistId
    }).then(function (data) {
        console.log("displaying playlist...");
        console.log(data);
        data.forEach(song => {
            console.log(song.title);
            let newListItem = $("<li>").text(song.title);
            $("#playlistSongsList").append(newListItem);
        });
    });
};
// Call select playlist
selectPlaylist(selectedPlaylistName, selectedPlaylistId);