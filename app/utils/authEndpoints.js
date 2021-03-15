const passport = require("passport");

module.exports = (app) => {
  app.get("/login", passport.authenticate("discord", {scope: "identify"}));
  app.get("/login/redirect", passport.authenticate("discord", {
    failureRedirect: "/error"
  }), (req, res) => {
    res.redirect("/home");
  });

  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/home");
  });
}