// Requiring models and passport
var db = require("../models");
var passport = require("../config/passport");
const { QueryTypes } = require("sequelize");
var passport = require("../config/passport");
var axios = require("axios");

module.exports = function(app) {
  // TODO? // Passport authentication middleware and login POST route
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      id: req.user.id
    });
  });
  // Signup POST route to create new user
  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    })
      .then(() => {
        res.status(200).end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Logout GET Route
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // GET route for all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(userData) {
      res.json(userData);
    });
  });

  // GET route for all playlists from specific user
  app.get("/api/playlists/user/:id", function(req, res) {
    db.Playlist.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(playlistsData) {
      res.json(playlistsData);
    });
  });

  // GET route for playlists from all users except the one logged in
  app.get("/api/playlists/otherusers", function(req, res) {
    db.sequelize.query("SELECT * FROM Playlists WHERE UserId != ?", {
      replacements: [req.user.id],
      type: QueryTypes.SELECT
    }).then(function(playlists) {
      res.json(playlists);
    });
  });

  // GET route for all songs from specific playlist
  app.get("/api/playlist/:id", function(req, res) {
    db.sequelize.query("SELECT * FROM Songs JOIN PlaylistSongs ON Songs.id = PlaylistSongs.SongId WHERE PlaylistSongs.PlaylistId = ?", {
      replacements: [req.params.id],
      type: QueryTypes.SELECT
      }
    ).then(function(playlistSongsData) {
      res.json(playlistSongsData);
    });
  });

  // POST route for create new playlist
  app.post("/api/playlists", function(req, res) {
    db.Playlist.create({
      name: req.body.name,
      UserId: req.user.id
    }).then(function(playlist) {
      res.json(playlist);
    });
  });

  // POST route to find or create new song
  app.post("/api/songs", function(req, res) {
    console.log("SONGreq.body");
    console.log(req.body);
    db.Song.findOrCreate({
      where: { title: req.body.title, artistName: req.body.artistName }
    }).then(function(song) {
      res.json(song);
    });
  });

  // POST route to create new playlistSong
  app.post("/api/playlistSongs", function(req, res) {
    db.PlaylistSong.create(req.body).then(function(playlistSong) {

      res.json(playlistSong);
    });
  });

  app.get("/api/songSearch/:searchTerm", function(req, res) {
    const queryURL =
        "https://deezerdevs-deezer.p.rapidapi.com/search/track?q=" + req.params.searchTerm;

    const settings = {
        async: true,
        crossDomain: true,
        url: queryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": process.env.songSearchPass
        },
    };

    axios(settings).then(function (response) {
      console.log(response.data);
      res.send(response.data);
      });
    })

    // Third Party Lyric Search
  app.get("/api/lyricSearch/:searchTerm", function(req, res) {
    const queryURL = "https://canarado-lyrics.p.rapidapi.com/lyrics/" + req.params.searchTerm;
    axios({
      url: queryURL,
      method: "GET",
      headers: {
          "x-rapidapi-host": "canarado-lyrics.p.rapidapi.com",
          "x-rapidapi-key": process.env.getLyricsPass
      }
    }).then(function(response) {
      // console.log(response.data);
      res.send(response.data);
    });
  });

  app.get("/api/artistInfo/:searchTerm", function(req, res) {
    const queryURL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + req.params.searchTerm;
    axios({
      url: queryURL,
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": process.env.artistInfoPass
      },
    }).then(function(response) {
      // console.log(response.data);
      res.send(response.data);
    })
  })

  app.get("/api/artistSearch/:searchTerm", function(req, res) {
    const queryURL =
      "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + req.params.searchTerm + "&api_key=" + process.env.artistSearchPass + "&format=json";
      axios({
        url: queryURL,
        method: "GET"
      }).then( function(response) {
        console.log(response.data);
        res.send(response.data);
      })


  })
  // DELETE route to delete playlistSong
};
