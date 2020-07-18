// Requiring models and passport
var db = require("../models");
// var passport = require("../config/passport");

module.exports = function(app) {
  // TODO? // Passport authentication middleware and login POST route
  // Signup POST route to create new user
  // Logout GET Route

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

  // POST route to create new playlistSong
  // DELETE route to delete playlistSong
};
