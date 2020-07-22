var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("homepage", {});
  });

  app.get("/login", function(req, res) {
    res.render("login", {});
  });

  app.get("/contact", function(req, res) {
    res.render("contact", {});

  app.get("/signup", function(req, res) {
    res.render("signup", {});
  });

  app.get("/dashboard", function(req, res) {
    let userId = 1;
    db.Playlist.findAll({
      where: {
        UserId: userId
      }
    }).then(function(playlistsData) {
      let hbsObject = {
        playlists: playlistsData.map(data => {
          return {
            id: data.id,
            name: data.name,
            userId: data.UserId
          };
        })
      };
      res.render("dashboard", hbsObject);
    });
  });

  app.get("/logout", function(req, res) {
    res.render("/", {});
  });
};
