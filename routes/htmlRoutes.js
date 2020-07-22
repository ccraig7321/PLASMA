var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("homepage", {});
  });

  app.get("/login", function(req, res) {
    res.render("login", {});
  });

  app.get("/contact", function(req, res) {
    res.render("contact", {});
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {});
  });

  app.get("/dashboard", isAuthenticated, function(req, res) {
    // let userId = 1;
    db.Playlist.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(playlistsData) {
      let hbsObject = {
        playlists: playlistsData.map(data => {
          return {
            id: data.id,
            name: data.name,
            userId: data.UserId
          };
        }),
        nameOfUser: req.user.name,
        idOfUser: req.user.id
      };
      res.render("dashboard", hbsObject);
    });
  });
}

