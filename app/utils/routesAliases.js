module.exports = (app) => {
  app.get("/punizioni", (req, res) => res.redirect("/punizioni/bans"))
  app.get(["/", "/index", "/index.html"], (req, res) => res.redirect("/home"));
  app.get(["/mods", "/modalities"], (req, res) => res.redirect("/modalita"));
  app.get(["/puni", "/punish", "/punishment", "/punishments"], (req, res) => res.redirect("/punizioni"));
  app.get(["/rules", "/rego"], (req, res) => res.redirect("/regole"));
  app.get(["/staffs"], (req, res) => res.redirect("/staff"));
}