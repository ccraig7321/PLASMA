// Requiring models and passport
var db = require("../models");
var passport = require("../config/passport");

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
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
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

  // GET route for all songs from specific playlist
  app.get("/api/playlistSongs/playlist/:id", function(req, res) {
    db.PlaylistSong.findAll({
      where: {
        playlistId: req.params.id
      },
      include: [
        {
          model: db.Song
          // TODO? // Figure out how to use nested includes
          // include: [
          //   {
          //     model: db.Artist,
          //     where: {
          //       artistId: 1
          //     }
          //   }
          // ]
        }
      ]
    }).then(function(playlistSongsData) {
      res.json(playlistSongsData);
    });
  });

  // POST route for create new playlist
  app.post("/api/playlists", function(req, res) {
    db.Playlist.create(req.body).then(function(playlist) {
      res.json(playlist);
    });
  });

  // POST route to find or create new genre
  app.post("/api/genres", function(req, res) {
    db.Genre.findOrCreate(req.body).then(function(genre) {
      res.json(genre);
    });
  });

  // POST route to find or create new artist
  app.post("/api/artists", function(req, res) {
    db.Artist.findOrCreate(req.body).then(function(artist) {
      res.json(artist);
    });
  });

  // POST route to find or create new song
  app.post("/api/songs", function(req, res) {
    db.Song.findOrCreate(req.body).then(function(song) {
      res.json(song);
    });
  });

  // POST route to create new playlistSong
  app.post("/api/playlistSongs", function(req, res) {
    db.PlaylistSong.create(req.body).then(function(playlistSong) {
      res.json(playlistSong);
    });
  });

  // DELETE route to delete playlistSong
};
