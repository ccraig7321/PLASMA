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
  // POST route for create new playlist
  // POST route to create new playlistSong
  // DELETE route to delete playlistSong
};
