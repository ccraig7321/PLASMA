var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("homepage", {});
  });

  app.get("/login", function(req, res) {
    res.render("login", {});
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {});
  });
};




